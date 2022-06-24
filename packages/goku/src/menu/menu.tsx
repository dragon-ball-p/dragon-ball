import * as React from 'react';
import classNames from 'classnames';

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
  const classnames = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });
  return (
    <MenuContext.Provider value={{ index: defaultIndex || '0', mode, onSelect }}>
      <ul className={classnames} {...others}>
        {children}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

Menu.displayName = 'Menu';
