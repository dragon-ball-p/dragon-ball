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
   * button 大小，默认 'normal'
   */
  size?: SizeType;
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
  const { className, size, defaultChecked, checked, onChange, children } = props;
  const [_checked, setChecked] = useState<boolean>(isBoolean(checked) ? checked : !!defaultChecked);
  useEffect(() => {
    setChecked(isBoolean(checked) ? checked : false);
  }, [checked]);
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!isBoolean(checked)) {
      // 非受控组件
      setChecked(e.target.checked);
    }
    onChange && onChange(e);
  };
  const sClz = getSizeClass(size);
  const clz = Classnames('checkbox', sClz, className);
  const iClz = Classnames('checkbox-inner', { 'is-checked': _checked });
  console.log('checkbox::render', checked, _checked);
  return (
    <label className={clz}>
      <span className={iClz}></span>
      <input type="checkbox" checked={_checked} onChange={_onChange} />
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
