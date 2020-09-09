import * as React from 'react';
import classNames from 'classnames';
import { Omit } from 'utility-types';
// import omit from 'omit.js';

import SizeContext, { SizeType } from '../config-provider';

const InputBaseCls = 'input';

type InputColors = 'primary' | 'info' | 'success' | 'warning' | 'danger';
// todo state - static
// todo - loading
// todo styles - outlined, inverted, rounded
// type InputHTMLType = 'button' | 'a' | 'submit' | 'reset';

export interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  color?: InputColors;
  size?: SizeType;
  value?: string;
  defaultValue?: string;

  className?: string;
  style?: React.CSSProperties;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const IInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { color, size, value, defaultValue, className, ...others } = props;

  const globalSize = React.useContext(SizeContext);
  const previousValueRef = React.useRef(value);
  const [_value, setValue] = React.useState(() => {
    if (value !== undefined) {
      return value;
    }
    return defaultValue;
  });
  if (value !== undefined && previousValueRef.current !== value) {
    previousValueRef.current = value;
    setValue(value);
  }

  console.log('ooooo', value, defaultValue, _value, previousValueRef);

  const inputRef = ref || React.createRef<HTMLInputElement>();

  const colorCls = color ? `is-${color}` : '';

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

  const [focused, setFocused] = React.useState(false);

  const stateClses: Array<string> = [];
  if (focused) {
    stateClses.push('is-focused');
  }
  const cls = classNames(InputBaseCls, className, colorCls, sizeCls, stateClses);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const { onChange } = props;
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    const { onFocus } = props;
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    const { onBlur } = props;
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyDown, onPressEnter } = props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <input
      {...others}
      ref={inputRef}
      value={_value}
      className={cls}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
});

export interface InputProps extends IInputProps {
  loading?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { loading, addonBefore, addonAfter, ...others } = props;
  const clses: Array<string> = [];
  if (loading) {
    clses.push('is-loading');
  }
  if (addonBefore) {
    clses.push('has-icons-left');
  }
  if (addonAfter) {
    clses.push('has-icons-right');
  }
  const inputRef = ref || React.createRef<HTMLInputElement>();
  const cls = classNames('control', clses);

  return (
    <div className={cls}>
      <IInput ref={inputRef} {...others}></IInput>
    </div>
  );
});
Input.displayName = 'Input';
Input.defaultProps = {
  type: 'default',
};

export default Input;
