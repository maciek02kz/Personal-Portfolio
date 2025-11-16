/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed basePath and assetPrefix (were used for GitHub Pages).
  // Keep defaults so the app serves from the root domain.
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
