/* eslint-disable */
const path = require('path');

module.exports = function override(config) {
  // Ensure Webpack doesn't require fully specified ESM imports in node_modules
  if (!config.resolve) config.resolve = {};
  config.resolve.fullySpecified = false;

  // Add rule to relax resolution for .mjs/.js in node_modules
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};
