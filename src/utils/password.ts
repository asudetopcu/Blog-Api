import bcrypt from "bcrypt";

const ROUNDS = 10;

export async function hashPassword(p: string) {
  return bcrypt.hash(p, ROUNDS);
}

export async function comparePassword(p: string, hash: string) {
  return bcrypt.compare(p, hash);
}
