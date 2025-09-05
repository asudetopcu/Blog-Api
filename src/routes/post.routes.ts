import { Router } from "express";
import { validate } from "../middlewares/validate";
import { validateQuery } from "../middlewares/validateQuery";
import { requireAuth } from "../middlewares/auth";
import { createPostSchema, updatePostSchema, listQuerySchema } from "../dtos/post.dto";
import * as PostController from "../controllers/post.controller";

const router = Router();

router.get("/", validateQuery(listQuerySchema), PostController.list);
router.get("/:slug", PostController.getBySlug);

router.post("/", requireAuth, validate(createPostSchema), PostController.create);
router.patch("/:id", requireAuth, validate(updatePostSchema), PostController.update);
router.delete("/:id", requireAuth, PostController.remove);

export default router;
