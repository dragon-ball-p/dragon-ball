import * as React from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

interface IMenuItem {
  index: string;
  disabled?: boolean;
  className?: string;
}

export const MenuItem: React.FC<React.PropsWithChildren<IMenuItem>> = (props) => {
  const { index, disabled, className, children, ...others } = props;
  const ctx = React.useContext(MenuContext);

  const classnames = classNames('menu-item', className, {
    'is-active': ctx.index === index,
    'is-disabled': disabled,
  });

  return (
    <li
      className={classnames}
      {...others}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        if (disabled) {
          return;
        }
        if (ctx.onSelect) {
          ctx.onSelect(index);
        }
      }}
    >
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
