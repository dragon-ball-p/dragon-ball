import * as React from 'react';
import classNames from 'classnames';
import { IMenuItemProps } from './menuItem';

const { useState } = React;

type MenuMode = 'vertical' | 'horizontal';

export interface IMenuProps {
  defaultIndex?: string;
  mode?: MenuMode;
  onSelect?: (index: string) => void;

  className?: string;
}

interface IMenuContext {
  index: string;
  mode?: MenuMode;
  onSelect?: (index: string) => void;
}
export const MenuContext = React.createContext<IMenuContext>({ index: '0' });

export const Menu: React.FC<React.PropsWithChildren<IMenuProps>> = (props) => {
  const { defaultIndex, mode, onSelect, className, children, ...others } = props;

  const [currentIndex, setCurrentIndex] = useState(defaultIndex || '0');
  const _onSelect = (index: string) => {
    setCurrentIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const classnames = classNames('menu-list', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const renderChildren = (children: React.ReactNode) => {
    return React.Children.map(children, (child, idx) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
      if (childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: `${idx}` });
      } else {
        console.error('请在 Menu 组件中包裹 MenuItem 组件');
      }
      return '';
    });
  };
  return (
    <MenuContext.Provider value={{ index: currentIndex, mode, onSelect: _onSelect }}>
      <ul className={classnames} {...others} data-testid="menu-test-id">
        {renderChildren(children)}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
};

Menu.displayName = 'Menu';
