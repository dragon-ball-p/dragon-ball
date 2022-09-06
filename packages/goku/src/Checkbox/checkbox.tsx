import React, { useEffect, useState } from 'react';
import Classnames from 'classnames';
import { SizeType, getSizeClass } from '../config/size-type';

export interface CheckboxProps {
  /**
   * 指定默认的选中状态
   */
  defaultChecked?: boolean;
  /**
   * 指定选中状态，注：传入此值 Checkbox 将变为受控组件
   */
  checked?: boolean;
  /**
   * Checkbox 大小，默认 'normal'
   */
  size?: SizeType;
  /**
   * 不可用
   */
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const isBoolean = (val?: boolean): val is boolean => {
  if (val === null || val === undefined) {
    return false;
  }
  return true;
};

export const Checkbox: React.FC<React.PropsWithChildren<CheckboxProps>> = (props) => {
  const { className, size, disabled, defaultChecked, checked, onChange, children } = props;

  const isControl = isBoolean(checked);

  // 若全部改为受控实现，可不使用 useState，状态变更时可减少一次 render
  const [_checked, setChecked] = useState<boolean>(isControl ? checked : !!defaultChecked);

  useEffect(() => {
    if (isControl) {
      setChecked(checked);
    }
  }, [isControl, checked]);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const _e = Object.create(e);
    _e.target = {
      ...e.target,
      value: children,
    };
    if (!isControl) {
      // 非受控组件
      setChecked(_e.target.checked);
    }
    onChange && onChange(_e);
  };
  const sClz = getSizeClass(size);
  const clz = Classnames('checkbox', sClz, { disabled }, className);
  const iClz = Classnames('checkbox-inner', { 'is-checked': _checked });
  console.log('checkbox::render', checked, _checked, children);
  return (
    <label className={clz}>
      <span className={iClz}></span>
      <input type="checkbox" checked={_checked} onChange={_onChange} disabled={disabled} />
      {children}
    </label>
  );
};

Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
  defaultChecked: false,
  size: 'normal',
  onChange: () => {
    // do sth.
  },
};
