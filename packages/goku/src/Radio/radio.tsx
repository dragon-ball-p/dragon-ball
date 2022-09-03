import React, { useContext } from 'react';
import Classnames from 'classnames';
import { SizeType, getSizeClass } from '../config/size-type';
import { RadioContext } from './context';

export interface RadioProps {
  /**
   * 单选框的值，用于比对是否选中
   */
  value: any;
  /**
   * Checkbox 大小，默认 'normal'
   */
  size?: SizeType;
  /**
   * 不可用
   */
  disabled?: boolean;
  className?: string;
}

export const Radio: React.FC<React.PropsWithChildren<RadioProps>> = (props) => {
  const { className, value, size, disabled, children } = props;
  const { name, value: _value, onChange } = useContext(RadioContext);
  const _checked = value === _value;
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const _e = Object.create(e);
    _e.target = {
      ...e.target,
      value,
    };
    onChange && onChange(_e);
  };
  const sClz = getSizeClass(size);
  const clz = Classnames('radio', sClz, { disabled }, className);
  const iClz = Classnames('radio-inner', { 'is-checked': _checked });
  console.log('radio::render', value, _value, _checked);
  return (
    <label className={clz}>
      <span className={iClz}></span>
      <input type="radio" name={name} checked={_checked} onChange={_onChange} disabled={disabled} />
      {children}
    </label>
  );
};

Radio.displayName = 'Radio';
Radio.defaultProps = {
  size: 'normal',
};
