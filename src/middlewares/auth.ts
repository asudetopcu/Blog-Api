import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthUser {
  sub: string;  
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith("Bearer ")) {
    return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Missing bearer token" } });
  }
  const token = h.substring(7);
  try {
    const payload = verifyAccessToken(token);
    if (typeof payload === "string") {
      return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid token" } });
    }
    req.user = { sub: String(payload.sub), role: (payload as any).role };
    next();
  } catch {
    return res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid token" } });
  }
}
