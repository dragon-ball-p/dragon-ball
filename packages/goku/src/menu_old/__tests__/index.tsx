import * as React from 'react';
import { RenderResult, render, fireEvent } from '@testing-library/react';
import { Menu } from '../menu';
import { MenuItem } from '../menuItem';

describe('Menu 按钮测试', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(
      <Menu>
        <MenuItem> 主页 </MenuItem>
        <MenuItem> 内容 </MenuItem>
        <MenuItem> 关于 </MenuItem>
      </Menu>,
    );
  });
  it('应该显示一个菜单', () => {
    expect(wrapper.getByTestId('menu-test-id')).toBeInTheDocument();
    const zeroElem = wrapper.getByText('主页');
    const firstElem = wrapper.getByText('内容');
    expect(zeroElem).toHaveClass('is-active');
    expect(firstElem).not.toHaveClass('is-active');
    fireEvent.click(firstElem);
    expect(firstElem).toHaveClass('is-active');
    expect(zeroElem).not.toHaveClass('is-active');
  });
});
