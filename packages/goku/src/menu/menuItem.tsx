import * as React from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

interface IMenuItem {
  index: string;
  className?: string;
}

export const MenuItem: React.FC<React.PropsWithChildren<IMenuItem>> = (props) => {
  const { index, className, children, ...others } = props;
  const ctx = React.useContext(MenuContext);

  const classnames = classNames('menu-item', className, {
    'is-active': ctx.index === index,
  });

  return (
    <li className={classnames} {...others}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
