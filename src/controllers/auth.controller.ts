import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { asyncHandler } from "../middlewares/asyncHandler";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: ok
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await AuthService.register(name, email, password);
  res.status(201).json({ data: result });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthService.login(email, password);
  res.json({ data: result });
});
