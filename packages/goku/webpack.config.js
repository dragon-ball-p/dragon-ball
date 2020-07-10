const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    library: 'goku',
    filename: 'goku.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader'
      }
    }]
  },
  plugins: [
    new webpack.BannerPlugin(`${package.description}\n \n@author ${package.author.name} <${package.author.url}>\n@license ${package.license}`),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(package.version)
    })
  ]
}
