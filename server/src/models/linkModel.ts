import mongoose, { Schema, Document } from "mongoose";

interface ILink extends Document {
    hash?: string;
    userId: mongoose.Types.ObjectId;
}

const linkSchema = new Schema<ILink>({
    hash: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<ILink>("Link", linkSchema);