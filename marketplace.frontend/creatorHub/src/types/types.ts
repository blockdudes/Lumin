import { Document } from "mongoose";

export interface IUserResourceData extends Document {
  title: string;
  description: string;
  price: string;
  category: string;
  hash: string;
  thumbnail: string;
  resource: any;
  allowListingAccess: boolean;
}

export type Chapter = {
  title: string;
  description: string;
  file: File | null;
  content: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  price: number;
  resourceHash: string;
  transactionDate: string;
  allowListingAccess: boolean;
};
