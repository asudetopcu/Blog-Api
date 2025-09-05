import { Types } from "mongoose";
import * as PostRepo from "../repositories/post.repo";
import { toSlug } from "../utils/slug";

export async function createPost(authorId: string, input: {
  title: string; content: string; tags?: string[]; status?: "draft"|"published";
}) {
  const baseSlug = toSlug(input.title);
  let slug = baseSlug;
  for (let i = 2; await PostRepo.findBySlug(slug); i++) {
    slug = `${baseSlug}-${i}`;
  }

  const publishedAt = input.status === "published" ? new Date() : null;

  const post = await PostRepo.create({
    title: input.title,
    slug,
    content: input.content,
    authorId: new Types.ObjectId(authorId),
    tags: input.tags ?? [],
    status: input.status ?? "draft",
    publishedAt
  });
  return post;
}

export async function getBySlug(slug: string) {
  const post = await PostRepo.findBySlug(slug);
  if (!post) {
    const err: any = new Error("Post not found");
    err.status = 404;
    throw err;
  }
  return post;
}

export async function updatePost(id: string, actorId: string, input: {
  title?: string; content?: string; tags?: string[]; status?: "draft"|"published";
}) {
  const existing = await PostRepo.findById(id);
  if (!existing) {
    const err: any = new Error("Post not found");
    err.status = 404;
    throw err;
  }
  if (String(existing.authorId) !== actorId) {
    const err: any = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  const patch: any = { ...input };
  if (input.title && input.title !== existing.title) {
    const baseSlug = toSlug(input.title);
    let slug = baseSlug;
    for (let i = 2; await PostRepo.findBySlug(slug); i++) {
      if (existing.slug === slug) break; 
      slug = `${baseSlug}-${i}`;
    }
    patch.slug = slug;
  }
  if (input.status && input.status !== existing.status) {
    patch.publishedAt = input.status === "published" ? new Date() : null;
  }

  const updated = await PostRepo.updateById(id, patch);
  return updated!;
}

export async function deletePost(id: string, actorId: string) {
  const existing = await PostRepo.findById(id);
  if (!existing) {
    const err: any = new Error("Post not found");
    err.status = 404;
    throw err;
  }
  if (String(existing.authorId) !== actorId) {
    const err: any = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  await PostRepo.deleteById(id);
}

export async function listPosts(opts: {
  q?: string; tag?: string; author?: string; status?: "draft"|"published";
  page: number; limit: number; sort: "publishedAt:desc" | "publishedAt:asc" | "createdAt:desc" | "createdAt:asc";
}) {
  const sortParts = opts.sort.split(":");
  const sort: Record<string, 1 | -1> = { [sortParts[0]]: sortParts[1] === "asc" ? 1 : -1 };
  const { items, total } = await PostRepo.list(
    { search: opts.q || undefined, tag: opts.tag, author: opts.author, status: opts.status },
    opts.page, opts.limit, sort
  );
  return {
    items,
    meta: {
      total,
      page: opts.page,
      limit: opts.limit,
      pages: Math.ceil(total / opts.limit)
    }
  };
}
