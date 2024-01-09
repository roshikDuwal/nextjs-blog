/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [

      {
        protocol: "https",
        hostname: "blog.dotsamsara.com",
        port: "",
        pathname: "/uploads/blog/**",
      },
    ],
  },
};

module.exports = nextConfig;
