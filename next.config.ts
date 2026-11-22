// import type { NextConfig } from "next"

// const nextConfig: NextConfig = {}

// export default nextConfig



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted at the actual Next.js project so it reads this
  // project's package-lock.json and .env instead of a parent directory.
  turbopack: {
    root: process.cwd(),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
