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
  "framework": "@storybook/react"
}
