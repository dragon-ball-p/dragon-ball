import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Menu } from './menu';
import { MenuItem } from './menuItem';

export default {
  title: 'Menu 菜单',
  component: Menu,
} as ComponentMeta<typeof Menu>;

export const Primary = (): React.ReactNode => (
  <Menu defaultIndex="1">
    <MenuItem index="0">主页</MenuItem>
    <MenuItem index="1">内容</MenuItem>
    <MenuItem index="2">关于</MenuItem>
  </Menu>
);
Primary.storyName = '菜单示例';
