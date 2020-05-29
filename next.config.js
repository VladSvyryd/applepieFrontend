// next.config.js
const withFonts = require('next-fonts');
require('dotenv').config(); // setup to use API keys from .env on frontend

const configs = {
  typescript: {
    // ignoreDevErrors: true,
  },
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    PIPEDRIVE: process.env.PIPEDRIVE_API_ACCESS_KEY,
  },
}
module.exports = withFonts(configs)
