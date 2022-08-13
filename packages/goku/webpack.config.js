/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const package = require('./package.json');
/* eslint-enable */

module.exports = {
  mode: 'production',
  entry: {
    goku: './src/index.ts',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'lib'),
    library: 'goku',
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.sass', '.css'],
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
        test: /\.s[ca]ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(
      `${package.description}\n\n@author ${package.author.name} <${package.author.url}>\n@license ${package.license}`,
    ),
    new webpack.DefinePlugin({ __VERSION__: JSON.stringify(package.version) }),
    new MiniCssExtractPlugin(),
  ],
};
