import { Router } from "express";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import postRoutes from "./post.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/health", healthRoutes);
router.use("/posts", postRoutes);


export default router;
