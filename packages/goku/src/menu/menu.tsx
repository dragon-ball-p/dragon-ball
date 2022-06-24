import * as React from 'react';
import classNames from 'classnames';

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
  return (
    <MenuContext.Provider value={{ index: currentIndex, mode, onSelect: _onSelect }}>
      <ul className={classnames} {...others} data-testid="menu-test-id">
        {children}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
};

Menu.displayName = 'Menu';
