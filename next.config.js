/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding")
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_DEPLOYMENT_URL: `https://${process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL}` || 'http://localhost:3000',
  },
  async rewrites() {
    return [
      {
        source: "/api-docs",
        destination: "/api/api-docs",
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.safe.global https://*.blockscout.com;",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, content-type, Authorization",
          },
        ],
      },
    ]
  },
}
