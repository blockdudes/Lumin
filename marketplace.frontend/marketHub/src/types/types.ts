export type Marketplace = {
  id: string;
  marketplaceName: string;
  description: string;
  image_url: string;
  feePercent: string;
  categories: string[];
  createdAt: string;
};

export type SubdomainId = {
  id: string;
  subdomain: string;
}