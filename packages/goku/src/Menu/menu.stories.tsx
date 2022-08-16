import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from './menu';
import { MenuItem } from './menu-item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Menu 菜单栏',
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  subcomponents: { MenuItem },
} as ComponentMeta<typeof Menu>;

export const Static: ComponentStory<typeof Menu> = () => {
  return (
    <Menu>
      <MenuItem key="1" disabled>
        第一个
      </MenuItem>
      <MenuItem key="2" active>
        第二个
      </MenuItem>
      <MenuItem key="3">第三个</MenuItem>
    </Menu>
  );
};
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Menu> = (args) => {
  const [active, setActive] = React.useState('2');
  const _onClick = (evt: React.MouseEvent, k: string) => {
    console.log('clicked ', k, evt);
    setActive(k);
  };
  return (
    <Menu {...args} onClick={_onClick}>
      <Menu.Item key="1" active={active === '1'}>
        第一个
      </Menu.Item>
      <Menu.Item key="2" active={active === '2'}>
        第二个
      </Menu.Item>
      <Menu.Item key="3" active={active === '3'} disabled>
        第三个
      </Menu.Item>
      <Menu.Item key="4" active={active === '4'}>
        第四个
      </Menu.Item>
    </Menu>
  );
};
Dynamic.args = {
  label: '菜单栏',
};
Dynamic.storyName = '动态示例';
