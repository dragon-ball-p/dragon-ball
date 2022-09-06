import React from 'react';
import Classnames from 'classnames';
import { Checkbox } from './checkbox';
import { CheckboxGroupContext, useCheckboxGroupContext } from './context';

export interface CheckboxGroupProps {
  defaultValue?: string[];
  value?: string[];
  items: string[];
  disabled?: boolean;
  className?: string;
  onChange?: (checkList: string[], isAll: boolean) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const { defaultValue, value, onChange, className, items, ...others } = props;

  const clz = Classnames('checkbox-group');

  const ctx = useCheckboxGroupContext({
    defaultValue,
    value,
    onChange,
    items,
  });

  return (
    <CheckboxGroupContext.Provider value={ctx}>
      <div className={clz} {...others}>
        {items.map((item) => {
          return (
            <CheckboxGroupContext.Consumer key={item}>
              {(value) => {
                const { checked, onChange: innerOnChange } = value;
                const isChecked = checked.includes(item);
                return (
                  <Checkbox className={className} onChange={innerOnChange} checked={isChecked}>
                    {item}
                  </Checkbox>
                );
              }}
            </CheckboxGroupContext.Consumer>
          );
        })}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.defaultProps = {
  items: [],
  disabled: false,
  onChange: function () {
    // do sth.
  },
};
