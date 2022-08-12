import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Button 按钮',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   type: { control: 'color' },
  // },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  type: 'primary',
  children: 'Primary',
  onClick: () => {
    console.log('clicked button');
  },
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
  children: '链接',
  href: 'https://www.baidu.com',
  target: '_blank',
};
