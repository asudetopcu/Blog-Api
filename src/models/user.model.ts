import { Schema, model, Document} from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: "user" | "admin";
  createdAt: Date;
  updateAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true }
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);