/* eslint-disable import/no-extraneous-dependencies */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants');

const withFonts = require('next-fonts');
const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withPlugins = require('next-compose-plugins');

const nextConfig = (phase, defaultConfig) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_SERVER;
  const isProdBuild = phase === PHASE_PRODUCTION_BUILD;
  const publicDirPath = '/_next';

  return {
    ...defaultConfig,
    distDir: 'build',
    assetPrefix: '',
    assetDirectory: 'static',
    env: {
      isDev,
      isProd,
      isProdBuild,
      API_URL: process.env.REACT_APP_API_URL,
      PUBLIC: isDev ? '' : publicDirPath,
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
    }
  };
};

module.exports = (phase, { defaultConfig }) => {
  const config = withPlugins(
    [
      [withBundleAnalyzer({})],
      [withFonts],
      [
        withOptimizedImages,
        {
          optimizeImagesInDev: true,
          removeOriginalExtension: true,
          optipng: {
            optimizationLevel: 3
          },
          svgo: {}
        }
      ]
    ],
    nextConfig(phase, defaultConfig)
  )(phase, { defaultConfig });
  return config;
};
