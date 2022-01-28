/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withOptimizedImages({
  images: {
    loader: 'custom',
    disableStaticImages: true
  },
  ...nextConfig
})
