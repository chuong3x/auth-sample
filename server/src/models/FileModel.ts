import mongoose, { ObjectId } from "mongoose";

const { Schema } = mongoose;
interface IFile {
    user: ObjectId;
    name: string;
    size: string;
    url: string;
}
const fileSchema = new mongoose.Schema<IFile>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        size: { type: String, required: true },
        url: { type: String, required: true },
    },
    { timestamps: true }
);
export const FileModel = mongoose.model<IFile>("File", fileSchema);
