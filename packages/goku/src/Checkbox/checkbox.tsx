import React, { useEffect, useState } from 'react';
import Classnames from 'classnames';

export interface CheckboxProps {
  defaultChecked?: boolean;
  checked?: boolean;
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
  const { className, defaultChecked, checked, onChange, children } = props;
  const [_checked, setChecked] = useState<boolean>(isBoolean(checked) ? checked : !!defaultChecked);
  useEffect(() => {
    setChecked(isBoolean(checked) ? checked : false);
  }, [checked]);
  const clz = Classnames('checkbox-inner', { 'is-checked': _checked }, className);
  console.log('checkbox::render', checked, _checked);
  return (
    <label className="checkbox">
      <span className={clz}></span>
      <input type="checkbox" checked={_checked} onChange={onChange} />
      {children}
    </label>
  );
};

Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
  defaultChecked: false,
  checked: false,
  onChange: () => {
    // do sth.
  },
};
