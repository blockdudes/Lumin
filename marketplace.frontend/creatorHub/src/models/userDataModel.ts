import mongoose, { Schema, Document } from "mongoose";
import { IUserResourceData } from "../types/types";


const resourceSchema: Schema<IUserResourceData> = new Schema({
    hash: { type: String, required: true },
    resource: { type: Object, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
});

export const UserResourceData = (mongoose.models.UserResourceData as mongoose.Model<IUserResourceData>) || mongoose.model<IUserResourceData>("UserResourceData", resourceSchema);