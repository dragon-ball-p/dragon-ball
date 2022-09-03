import React, { useEffect, useState } from 'react';
import Classnames from 'classnames';
import { SizeType, getSizeClass } from '../config/size-type';

export interface RadioProps {
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

export const Radio: React.FC<React.PropsWithChildren<RadioProps>> = (props) => {
  const { className, size, disabled, defaultChecked, checked, onChange, children } = props;
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
  const clz = Classnames('radio', sClz, { disabled }, className);
  const iClz = Classnames('radio-inner', { 'is-checked': _checked });
  console.log('radio::render', checked, _checked);
  return (
    <label className={clz}>
      <span className={iClz}></span>
      <input type="radio" checked={_checked} onChange={_onChange} disabled={disabled} />
      {children}
    </label>
  );
};

Radio.displayName = 'Radio';
Radio.defaultProps = {
  defaultChecked: false,
  size: 'normal',
  onChange: () => {
    // do sth.
  },
};
