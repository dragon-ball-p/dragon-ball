import React, { PropsWithChildren } from 'react';

export interface FormItemProps {
  label: string;
  labelWidth: number;
}

const FormItem: React.FC<PropsWithChildren<FormItemProps>> = function (props) {
  return (
    <div>
      <label>{props.label}</label>
      {props.children}
    </div>
  );
};

export { FormItem };
