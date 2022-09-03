import React, { createContext, useState, useMemo, useEffect } from 'react';

interface IRadioContext {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
}

export const RadioContext = createContext<IRadioContext>({
  name: 'radio',
  onChange: function () {
    // do sth.
  },
  value: null,
});

export function useRadioContext(params: Partial<IRadioContext> & { name: string; defaultValue: any }): IRadioContext {
  const { name, defaultValue, value, onChange } = params;

  const [_value, setValue] = useState(value === undefined ? defaultValue : value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const _onChange = useMemo(() => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('____', e.target);
      console.log('___2_', e.target.value);
      if (value === undefined) {
        // 非受控组件
        setValue(e.target.value);
      }
      onChange && onChange(e);
    };
  }, [onChange, value]);

  return useMemo(() => {
    const ctx = {
      name,
      onChange: _onChange,
      value: _value,
    };
    return ctx;
  }, [_value, name, _onChange]);
}
