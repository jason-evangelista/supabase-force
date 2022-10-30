/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        destination: "/p/dashboard",
        source: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
