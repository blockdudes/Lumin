import mongoose, { Schema, Document } from "mongoose";
import { SubdomainId } from "../types/types";

const resourceSchema: Schema<SubdomainId> = new Schema({
    id: { type: String, required: true , unique: true },
    subdomain: { type: String, required: true , unique: true},
});

export const SubdomainIdData =
  (mongoose.models.SubdomainIdData as mongoose.Model<SubdomainId>) ||
  mongoose.model<SubdomainId>("SubdomainIdData", resourceSchema);
