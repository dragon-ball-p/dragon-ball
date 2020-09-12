import * as React from 'react';
import classNames from 'classnames';
// import omit from 'omit.js';

import SizeContext, { SizeType } from '../config-provider';

const ButtonBaseCls = 'button';

type ButtonTypes = 'default' | 'primary' | 'link';
type ButtonStates = 'hover' | 'focus' | 'active' | 'loading';
// todo state - static
// todo styles - outlined, inverted, rounded
// type ButtonHTMLType = 'button' | 'a' | 'submit' | 'reset';

export interface ButtonProps {
  type?: ButtonTypes;
  size?: SizeType;
  state?: ButtonStates;

  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>((props, ref) => {
  const { type, size, state, className, children, ...others } = props;

  const globalSize = React.useContext(SizeContext);

  const buttonRef = ref || React.createRef<HTMLButtonElement>();

  const typeCls = `is-${type}`;

  let sizeCls = '';
  switch (size || globalSize) {
    case 'small':
      sizeCls = 'is-small';
      break;
    case 'medium':
      sizeCls = 'is-medium';
      break;
    case 'large':
      sizeCls = 'is-large';
      break;
    default:
      break;
  }

  let stateCls = '';
  let isLoading = false;
  switch (state) {
    case 'hover':
      stateCls = 'is-hovered';
      break;
    case 'focus':
      stateCls = 'is-focused';
      break;
    case 'active':
      stateCls = 'is-actived';
      break;
    case 'loading':
      stateCls = 'is-loading';
      isLoading = true;
      break;
    default:
      break;
  }
  const cls = classNames(ButtonBaseCls, className, typeCls, sizeCls, stateCls);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    if (isLoading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  const result = (
    <button className={cls} onClick={handleClick} ref={buttonRef} {...others}>
      {children}
    </button>
  );

  return result;
});

Button.displayName = 'Button';
Button.defaultProps = {
  type: 'default',
};

export default Button;
