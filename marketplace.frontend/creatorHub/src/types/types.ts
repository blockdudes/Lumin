import { Document } from "mongoose";

export interface IUserResourceData extends Document {
  title: string;
  description: string;
  hash: string;
  thumbnail: string;
  resource: Buffer;
}

export type Chapter = {
  title: string;
  description: string;
  file: File | null;
  content: string;
};

export type Course = {
  title: string;
  description: string;
  chapters: Chapter[];
};
