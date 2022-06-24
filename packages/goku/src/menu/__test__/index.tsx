import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { Menu } from '../menu';
import { MenuItem } from '../menuItem';

describe('Menu 按钮测试', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(
      <Menu defaultIndex="1">
        <MenuItem index="0"> 主页 </MenuItem>
        <MenuItem index="1"> 内容 </MenuItem>
        <MenuItem index="0"> 关于 </MenuItem>
      </Menu>,
    );
  });
  it('应该显示一个菜单', () => {
    expect(wrapper.getByTestId('menu-test-id')).toBeInTheDocument();
    expect(wrapper.getByText('内容')).toHaveClass('is-active');
    expect(wrapper.getByText('主页')).not.toHaveClass('is-active');
  });
});
