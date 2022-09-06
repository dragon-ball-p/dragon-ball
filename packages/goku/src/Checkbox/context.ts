import React, { createContext, useState } from 'react';

export interface CheckboxGroupContextParams {
  defaultValue?: string[];
  value?: string[];
  onChange?: (checkList: string[], isAll: boolean) => void;
  items: string[];
}

export interface CheckGroupContextValue {
  checked: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxGroupContext = createContext<CheckGroupContextValue>({
  checked: [],
  onChange: () => {
    // do sth.
  },
});

export const useCheckboxGroupContext = (params: CheckboxGroupContextParams): CheckGroupContextValue => {
  const { defaultValue, value, items, onChange } = params;

  const isControl = value !== undefined;

  const [checked, setChecked] = useState(!isControl ? defaultValue || [] : value);

  React.useEffect(() => {
    if (isControl) {
      setChecked(value);
    }
  }, [isControl, value]);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _checked = checked.includes(e.target.value)
      ? checked.filter((item) => item !== e.target.value)
      : checked.concat(e.target.value);
    if (!isControl) {
      setChecked(_checked);
    }
    onChange && onChange(_checked, _checked.length === items.length);
  };

  return {
    checked,
    onChange: _onChange,
  };
};
