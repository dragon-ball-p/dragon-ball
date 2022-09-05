import React from 'react';
import Classnames from 'classnames';
import { RadioContext, useRadioContext } from './context';

export interface RadioGroupProps {
  name: string;
  defaultValue?: any;
  value?: any;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = (props) => {
  const { name, defaultValue, value, className, onChange, children, ...others } = props;

  const ctx = useRadioContext({ name, defaultValue, value, onChange });

  const clz = Classnames('radio-group', className);

  console.log('RadioGroup::render', name, defaultValue, value);
  return (
    <RadioContext.Provider value={ctx}>
      <div className={clz} {...others}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';
RadioGroup.defaultProps = {
  onChange: () => {
    // do sth.
  },
};
