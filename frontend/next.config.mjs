/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
    domains: ["drive.google.com"],
  },
  async redirects() {
    return [
        {
            source: '/404',
            destination: '/not-found',
            permanent: false,
        },
    ];
},
};

export default nextConfig;
