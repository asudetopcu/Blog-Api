import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  const status = err.status ?? 500;
  const message = err.message ?? "Internal Server Error";
  return res.status(status).json({ error: { code: "INTERNAL_ERROR", message } });
}
