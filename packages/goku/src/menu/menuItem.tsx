import * as React from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
}

export const MenuItem: React.FC<React.PropsWithChildren<IMenuItemProps>> = (props) => {
  const { index, disabled, className, children, ...others } = props;
  const ctx = React.useContext(MenuContext);

  const classnames = classNames('menu-item', className, {
    'is-active': ctx.index === index,
    'is-disabled': disabled,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (ctx.onSelect && !disabled && typeof index === 'string') {
      ctx.onSelect(index);
    }
  };

  return (
    <li className={classnames} {...others} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
