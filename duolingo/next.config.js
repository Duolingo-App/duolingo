/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko']
  },
  env: {
    RAPID_API_KEY: 'a3c7b027c4mshb692e777f3c062fp12cd6bjsne025cf5ff67f'
  }
}

module.exports = nextConfig
