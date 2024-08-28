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
