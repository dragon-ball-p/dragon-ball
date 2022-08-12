import * as React from 'react';
import classNames from 'classnames';
// import omit from 'omit.js';

import SizeContext, { SizeType } from '../config-provider';

const ButtonBaseCls = 'button';

type ButtonTypes = 'default' | 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
type ButtonStates = 'hover' | 'focus' | 'active' | 'loading';
// todo state - static
// todo styles - outlined, inverted, rounded
// type ButtonHTMLType = 'button' | 'a' | 'submit' | 'reset';

export interface ButtonProps {
  type?: ButtonTypes;
  size?: SizeType;
  state?: ButtonStates;

  disabled?: boolean;
  href?: string;

  // className?: string;
  // onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps & React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>>
>((props, ref) => {
  const { type, size, state, disabled, href, className, children, ...others } = props;

  const globalSize = React.useContext(SizeContext);

  const buttonRef = ref || React.createRef<HTMLButtonElement>();

  const typeCls = 'default' === type ? '' : `is-${type}`;

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
      stateCls = 'is-active';
      break;
    case 'loading':
      stateCls = 'is-loading';
      isLoading = true;
      break;
    default:
      break;
  }
  const cls = classNames(
    ButtonBaseCls,
    {
      disabled: type === 'link' && disabled,
    },
    typeCls,
    sizeCls,
    type === 'link' ? '' : stateCls,
    className,
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    if (isLoading || disabled) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  return type === 'link' ? (
    <a className={cls} href={href} ref={(buttonRef as unknown) as React.RefObject<HTMLAnchorElement>} {...others}>
      {children}
    </a>
  ) : (
    <button className={cls} onClick={handleClick} disabled={disabled} ref={buttonRef} {...others}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
Button.defaultProps = {
  type: 'default',
  disabled: false,
};

export default Button;
