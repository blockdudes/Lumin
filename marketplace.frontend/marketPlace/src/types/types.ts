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

export type FetchedResource = {
  title: string;
  description: string;
  file: string;
  content: string;
  type: string;
};

export type Marketplace = {
  id: string;
  description: string;
  marketplaceName: string;
  image_url: string;
  feePercent: number;
  categories: string[];
  createdAt: string;
  isOwnedResourcesMarketplace: boolean;
  theme: string;
};
