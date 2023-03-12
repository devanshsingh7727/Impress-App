const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache.js');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
