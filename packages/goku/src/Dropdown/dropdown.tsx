import React from 'react';
import { Popover } from '../Popover';
import { DropdownTrigger } from './dropdown-trigger';
import { DropdownContent } from './dropdown-content';

export interface DropdownProps {
  visible?: boolean;
  trigger?: 'click' | 'hover';
}

export interface Dropdown extends React.FC<React.PropsWithChildren<DropdownProps>> {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
}

export const Dropdown: Dropdown = (props) => {
  const { visible, trigger, children } = props;

  console.log('Dropdown::render::');

  return (
    <Popover visible={visible} trigger={trigger}>
      {children}
    </Popover>
  );
};
Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
  visible: false,
  trigger: 'hover',
};
