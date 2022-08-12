import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Menu } from './menu';
import { SubMenu } from './subMenu';
import { MenuItem } from './menuItem';

export default {
  title: 'Menu 菜单',
  component: Menu,
  subcomponents: { SubMenu, MenuItem },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => {
  const { children, ...others } = args;
  const renderFragmentChild = (child: React.ReactElement) => {
    return child.props.children;
  };
  return <Menu {...others}>{React.Children.map(children, renderFragmentChild)}</Menu>;
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  mode: 'primary',
  children: (
    <>
      <MenuItem>主页</MenuItem>
      <MenuItem>内容</MenuItem>
      <MenuItem disabled>待补充</MenuItem>
      <SubMenu title="设置">
        <MenuItem>个人信息</MenuItem>
        <MenuItem>账号安全</MenuItem>
      </SubMenu>
      <MenuItem>关于</MenuItem>
    </>
  ),
  onSelect: (idx: string) => {
    console.log('select ', idx);
  },
};

Primary.storyName = '菜单示例';
