import type { Config } from 'next-i18next'

const config: Config = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'],
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'ar', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'],
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

module.exports = config
