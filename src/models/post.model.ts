import { Document, model, Schema, Types } from "mongoose";

export interface IPost extends Document {
    title: string;
    slug: string;
    content: string;
    authorId: Types.ObjectId;
    tags: string[];
    status: "draft" | "published";
    publishedAt?: Date | null;
    likeCount: number;
    commentCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tags: { type: [String], default: [], index: true },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    publishedAt: { type: Number, default: 0},
    commentCount: { type: Number, default: 0 }
}, { timestamps: true });

postSchema.index({ title: "text", content: "text"});

export const Post = model<IPost>("Post", postSchema);