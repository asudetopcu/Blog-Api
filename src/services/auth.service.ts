import * as UserRepo from "../repositories/user.repo";
import { hashPassword, comparePassword } from "../utils/password";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export async function register(name: string, email: string, password: string) {
  const exists = await UserRepo.findByEmail(email);
  if (exists) {
    const err: any = new Error("Email already in use");
    err.status = 409;
    throw err;
  }
  const passwordHash = await hashPassword(password);
  const user = await UserRepo.createUser({ name, email, passwordHash });
  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id });
  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    tokens: { accessToken, refreshToken }
  };
}

export async function login(email: string, password: string) {
  const user = await UserRepo.findByEmail(email);
  if (!user) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }
  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }
  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id });
  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    tokens: { accessToken, refreshToken }
  };
}
