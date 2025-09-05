import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
    await mongoose.connect(env.MONGO_URI);
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected");
    });
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB error: ", err);
    })
}