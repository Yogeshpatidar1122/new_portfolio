const path = require('path')

module.exports = {

  eslint: {
    ignoreDuringBuilds: true, // Ignore linting errors
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors
  },


  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  target: 'serverless',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },
}