/* eslint-disable */
const webpack = require('webpack');
const merger = require('webpack-merge');
const base = require('./webpack.config');
/* eslint-enable */

module.exports = merger.merge(base, {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  entry: {
    main: ['./src/index.ts'],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
