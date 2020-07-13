/* eslint-disable */
const webpack = require('webpack');
const merger = require('webpack-merge');
const base = require('./webpack.config');
/* eslint-enable */

module.exports = merger.merge(base, {
  mode: 'development',
  entry: {
    main: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './src/index.tsx'],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
