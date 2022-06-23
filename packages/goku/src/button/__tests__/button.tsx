import * as React from 'react';
import { render } from '@testing-library/react';
import Button from '../button';

describe('测试 Button 组件', () => {
  it('可以正确地渲染默认 Button', () => {
    const wrapper = render(<Button>Nice</Button>);
    expect(wrapper.getByRole('button')).toBeInTheDocument();
  });
  it('传入不同 props 时可以正确地渲染 Button', () => {
    const wrapper = render(<Button type="primary">Primary</Button>);
    expect(wrapper.getByRole('button')).toHaveClass('is-primary');
  });
  it('指定 link 类型并提供 href 时可以正确地渲染 Button', () => {
    const href = 'https://www.baidu.com';
    const wrapper = render(
      <Button type="link" href={href}>
        Baidu
      </Button>,
    );
    expect(wrapper.getByText('Baidu')).toBeInstanceOf(HTMLAnchorElement);
    expect(wrapper.getByRole('link')).toHaveAttribute('href');
    expect(wrapper.getByRole('link').getAttribute('href')).toEqual(href);
  });
  it('Disabled Button 时，按钮不可点', () => {
    const wrapper = render(<Button disabled>Primary</Button>);
    expect(wrapper.getByRole('button')).toBeDisabled();
  });
});
