import { User, IUser } from "../models/user.model";

export async function findByEmail(email: string) {
  return User.findOne({ email }).exec();
}

export async function createUser(data: Pick<IUser, "email" | "name" | "passwordHash">) {
  const user = new User({ ...data });
  return user.save();
}
