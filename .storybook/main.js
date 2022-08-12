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
  core: {
    builder: 'webpack5'
  },
  "framework": "@storybook/react",
  webpackFinal: async(config, {configType}) => {
    config.module.rules.push({
      test: /\.s[ca]ss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('autoprefixer')],
            },
            sourceMap: true,
          },
        },
        'sass-loader'
      ],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
}
