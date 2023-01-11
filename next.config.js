/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.pixabay.com'],
  },
  webpack(config, { webpack }) {
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '_next/static/worker',
            outputPath: 'static/worker',
          },
        },
      ],
    }),
      (config.resolve = {
        alias: {
          '@pages': path.resolve(__dirname, './pages/*'),
          '@components': path.resolve(__dirname, './components/*'),
          '@styles': path.resolve(__dirname, './styles/*'),
          '@hooks': path.resolve(__dirname, './hooks/*'),
          '@utils': path.resolve(__dirname, './utils/*'),
        },
        ...config.resolve,
      });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signin',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
