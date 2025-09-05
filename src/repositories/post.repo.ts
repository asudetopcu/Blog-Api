import { FilterQuery } from "mongoose";
import { Post, IPost } from "../models/post.model";

export async function create(doc: Partial<IPost>) {
  const p = new Post(doc);
  return p.save();
}

export async function findById(id: string) {
  return Post.findById(id).exec();
}

export async function findBySlug(slug: string) {
  return Post.findOne({ slug }).exec();
}

export async function updateById(id: string, data: Partial<IPost>) {
  return Post.findByIdAndUpdate(id, data, { new: true }).exec();
}

export async function deleteById(id: string) {
  return Post.findByIdAndDelete(id).exec();
}

export async function list(
  q: { search?: string; tag?: string; author?: string; status?: "draft" | "published" },
  page: number,
  limit: number,
  sort: Record<string, 1 | -1>
) {
  const filter: FilterQuery<IPost> = {};
  if (q.status) filter.status = q.status;
  if (q.tag) filter.tags = q.tag;
  if (q.author) filter.authorId = q.author;
  if (q.search) {
    filter.$or = [
      { title: { $regex: q.search, $options: "i" } },
      { content: { $regex: q.search, $options: "i" } }
    ];
  }

  const [items, total] = await Promise.all([
    Post.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).lean().exec(),
    Post.countDocuments(filter).exec()
  ]);

  return { items, total };
}
