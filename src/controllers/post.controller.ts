// src/controllers/post.controller.ts
import { Request, Response } from "express";
import * as PostService from "../services/post.service";
import { asyncHandler } from "../middlewares/asyncHandler";

type ListQuery = {
  q?: string;
  tag?: string;
  author?: string;
  status?: "draft" | "published";
  page: number;
  limit: number;
  sort: "publishedAt:desc" | "publishedAt:asc" | "createdAt:desc" | "createdAt:asc";
};

export const create = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.sub;
  const post = await PostService.createPost(userId, req.body);
  res.status(201).json({ data: post });
});

export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
  const post = await PostService.getBySlug(req.params.slug);
  res.json({ data: post });
});

export const list = asyncHandler(async (_req: Request, res: Response) => {
  const q = (res.locals as any).query as ListQuery;

  const result = await PostService.listPosts({
    q: q?.q,
    tag: q?.tag,
    author: q?.author,
    status: q?.status,
    page: q.page,
    limit: q.limit,
    sort: q.sort,
  });

  res.json({ data: result.items, meta: result.meta });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.sub;
  const updated = await PostService.updatePost(req.params.id, userId, req.body);
  res.json({ data: updated });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.sub;
  await PostService.deletePost(req.params.id, userId);
  res.sendStatus(204);
});
