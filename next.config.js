const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com']
  }
})
