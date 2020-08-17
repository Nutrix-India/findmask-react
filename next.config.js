/* eslint-disable import/no-extraneous-dependencies */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants');

const withFonts = require('next-fonts');
const optimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_SERVER;
  const isProdBuild = phase === PHASE_PRODUCTION_BUILD;
  let assetPrefix = `${process.env.ASSET_PREFIX}${process.env.SERVER}`;
  let PUBLIC = `${assetPrefix}/_next`;
  if (isDev || !process.env.SERVER) {
    assetPrefix = '';
    PUBLIC = '';
  }

  return {
    assetPrefix,
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    optimizeImagesInDev: true,
    removeOriginalExtension: true,
    assetDirectory: 'static',
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
    env: {
      isDev,
      isProd,
      isProdBuild,
      API_URL: process.env.REACT_APP_API_URL,
      PUBLIC,
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
    }
  };
};

module.exports = (phase) =>
  withBundleAnalyzer(optimizedImages(withFonts(nextConfig(phase))));
