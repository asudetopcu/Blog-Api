import Joi from "joi";

export const createPostSchema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().min(10).required(),
    tags: Joi.array().items(Joi.string()).default([]),
    status: Joi.string().valid("draft", "published").default("draft")
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(200),
  content: Joi.string().min(10),
  tags: Joi.array().items(Joi.string()),
  status: Joi.string().valid("draft", "published")
}).min(1);

export const listQuerySchema = Joi.object({
  q: Joi.string().allow(""),
  tag: Joi.string(),
  author: Joi.string(),     
  status: Joi.string().valid("draft", "published"),
  sort: Joi.string().valid("publishedAt:desc", "publishedAt:asc", "createdAt:desc", "createdAt:asc").default("publishedAt:desc"),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10)
});