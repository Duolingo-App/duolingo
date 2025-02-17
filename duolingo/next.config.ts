import type { NextConfig } from "next";
import i18nextConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "example.com",
      "i.pinimg.com",
      "images.unsplash.com",
      "cdn.example.com",
      "mycdn.com",
      "assets.example.com",
      "images.pexels.com",
    ],
  },
  i18n: i18nextConfig.i18n, // Import the i18n config
};

export default nextConfig;
