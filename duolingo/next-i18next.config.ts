import type { UserConfig } from "next-i18next";

const i18nextConfig: UserConfig = {
  i18n: {
    locales: ["en", "fr", "de", "ar"], // Added Arabic
    defaultLocale: "en",
    localeDetection: false, // Prevent auto-detection from browser settings
  },
};

export default i18nextConfig;
