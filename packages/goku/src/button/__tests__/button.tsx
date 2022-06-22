import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../button';

test('our first react test case', () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryAllByText('Nice');
  expect(element).toBeTruthy();
});

test('test button types', () => {
  render(<Button type="primary">Primary</Button>);
  expect(screen.getByRole('button')).toHaveClass('is-primary');
});
