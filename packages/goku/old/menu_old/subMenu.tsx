import * as React from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { IMenuItemProps } from './menuItem';

const { useState, useContext } = React;

export interface ISubMenuProps {
  index?: string;
  title?: string;
  className?: string;
  subClassName?: string;
  open?: boolean;
  disabled?: boolean;
}

export const SubMenu: React.FC<React.PropsWithChildren<ISubMenuProps>> = (props) => {
  const { title, index, className, subClassName, open, disabled, children, ...others } = props;
  const ctx = useContext(MenuContext);
  const [isOpen, setIsOpen] = useState(open || false);

  const isSelected = ctx.index.split('.').shift() === index;
  const classnames = classNames('menu-item menu-sub', className, {
    'is-opened': isOpen,
    'is-disabled': disabled,
    'is-active': isSelected,
  });
  const subClassnames = classNames('menu-sub-list', subClassName);

  const renderChildren = (children) => {
    return React.Children.map(children, (child, _idx) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}.${_idx}` });
      } else {
        console.error('SubMenu 下必须包裹 MenuItem 组件');
      }
      return '';
    });
  };

  const handleMouse = (open) => {
    setIsOpen(open);
  };

  return (
    <li
      className={classnames}
      {...others}
      onMouseEnter={() => handleMouse(true)}
      onMouseLeave={() => handleMouse(false)}
    >
      <p>{title}</p>
      <ul className={subClassnames}>{renderChildren(children)}</ul>
    </li>
  );
};

SubMenu.defaultProps = {
  index: '0',
  title: '',
  open: false,
  disabled: false,
};

SubMenu.displayName = 'SubMenu';
