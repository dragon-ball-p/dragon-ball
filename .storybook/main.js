const path = require('path');

module.exports = {
  "stories": [
    {
      directory: '../packages/goku/src',
      titlePrefix: '龙珠',
      files: '**/*.stories.@(mdx|ts|tsx)',
    }
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  webpackFinal: async(config, {configType}) => {
    config.module.rules.push({
      test: /\.s(c|a)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
}
