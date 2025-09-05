import { Router } from "express";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../dtos/user.dto";
import * as AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

export default router;
