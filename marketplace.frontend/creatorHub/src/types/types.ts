import { Document } from "mongoose";

export interface IUserResourceData extends Document {
    title: string;
    description: string;
    hash: string;
    thumbnail: string;
    resource: Buffer;
}