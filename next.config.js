/** @type {import('next').NextConfig} */
const fs = require('fs')
const path = require('path')

const indexNowKey = process.env.INDEXNOW_KEY
if (indexNowKey) {
  const keyFile = path.join(__dirname, 'public', `${indexNowKey}.txt`)
  fs.writeFileSync(keyFile, indexNowKey)
}

const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    deviceSizes: [480, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  webpack: (config, { dev }) => {
    // Avoid corrupted filesystem cache on Windows (EPERM/hasStartTime errors) when
    // multiple dev servers share .next/cache or Node 23+ hits webpack pack bugs.
    if (dev) {
      config.cache = { type: 'memory' }
    }
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
