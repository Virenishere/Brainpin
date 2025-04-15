import mongoose, { Document, Schema, Types } from "mongoose";

const contentTypes = ["images", "video", "articles", "audio"] as const;

export interface IPost extends Document {
    type: typeof contentTypes[number];
    link: Types.ObjectId;
    title: string;
    tags?: Types.ObjectId[];
    userId: Types.ObjectId;
}

const postSchema = new Schema<IPost>({
    type: { type: String, enum: contentTypes, required: true },
    link: { type: Schema.Types.ObjectId, ref: "Link", required: true },
    title: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IPost>("Post", postSchema);