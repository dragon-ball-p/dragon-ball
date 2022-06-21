/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');
/* eslint-enable */

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
    extensions: ['.ts', '.tsx', '.js'],
  },
  // Fix Hooks + mulitiple instances of React - https://github.com/facebook/react/issues/13991#issuecomment-624338260
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: {
          loader: 'sass-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(
      `${package.description}\n\n@author ${package.author.name} <${package.author.url}>\n@license ${package.license}`,
    ),
    new webpack.DefinePlugin({ __VERSION__: JSON.stringify(package.version) }),
  ],
};
