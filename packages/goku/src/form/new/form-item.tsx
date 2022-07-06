import React from 'react';
import { FormContext } from './context';

export interface FormItemProps {
  name?: string;
  // todo rules
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const { name, children } = props;

  const store = React.useContext(FormContext);

  const getControls = () => ({
    value: name && store.getItemValue(name),
    onChange(e) {
      console.log('Form Element ', e.target);
      console.log('Form Element Value', e.target.value);
      name && store.setItemValues({ name: e.target.value });
    },
  });

  const childNode = React.isValidElement(children)
    ? React.cloneElement(children, { ...children.props, ...getControls() })
    : children;

  return <div className="form-item">{childNode}</div>;
};
