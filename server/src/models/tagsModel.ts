import mongoose, { Schema, Document } from "mongoose";

interface ITag extends Document {
    title: string;
}

const tagSchema = new Schema<ITag>({
    title: { type: String, required: true, unique: true },
});

export default mongoose.model<ITag>("Tag", tagSchema);