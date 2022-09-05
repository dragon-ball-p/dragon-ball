import React, { createContext, useState } from 'react';

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

  // value 不为 undefined 时，认定为受控组件
  // 受控时，状态值由外部控制，非受控时，状态值由内部维护
  const isControl = value !== undefined;

  const [_value, setValue] = useState(!isControl ? defaultValue : value);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControl) {
      // 非受控组件
      setValue(e.target.value);
    }
    onChange && onChange(e);
  };

  return {
    name,
    onChange: _onChange,
    value: isControl ? value : _value,
  };
}
