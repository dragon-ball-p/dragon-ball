import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Menu } from './menu';
import { MenuItem } from './menuItem';

export default {
  title: 'Menu 菜单',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  mode: 'primary',
  children: (
    <>
      <MenuItem index="0">主页</MenuItem>
      <MenuItem index="1">内容</MenuItem>
      <MenuItem index="2" disabled>
        待补充
      </MenuItem>
      <MenuItem index="3">关于</MenuItem>
    </>
  ),
  onSelect: (idx: string) => {
    console.log('select ', idx);
  },
};

Primary.storyName = '菜单示例';
