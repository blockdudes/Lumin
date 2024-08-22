/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/revenue",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
