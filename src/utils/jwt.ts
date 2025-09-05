import * as jwt from "jsonwebtoken";
import { env } from "../config/env";

type Payload = jwt.JwtPayload | Record<string, unknown>;

export function signAccessToken(payload: Payload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET as jwt.Secret, {
    expiresIn: env.JWT_ACCESS_EXPIRES as unknown as number 
  });
}

export function signRefreshToken(payload: Payload): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET as jwt.Secret, {
    expiresIn: env.JWT_REFRESH_EXPIRES as unknown as number
  });
}

export function verifyAccessToken(token: string): jwt.JwtPayload | string {
  return jwt.verify(token, env.JWT_ACCESS_SECRET as jwt.Secret);
}

export function verifyRefreshToken(token: string): jwt.JwtPayload | string {
  return jwt.verify(token, env.JWT_REFRESH_SECRET as jwt.Secret);
}
