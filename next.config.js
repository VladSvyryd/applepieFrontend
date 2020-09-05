// next.config.js
const withFonts = require('next-fonts');
require('dotenv').config(); // setup to use API keys from .env on frontend
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const configs = {
  typescript: {
    // ignoreDevErrors: true,
  },
  target: 'serverless',
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    PIPEDRIVE_API_ACCESS_KEY: process.env.PIPEDRIVE_API_ACCESS_KEY,
    BACKEND_STRAPI_CMS: process.env.BACKEND_STRAPI_CMS,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY


  },
}
module.exports = withFonts(withBundleAnalyzer(configs))
