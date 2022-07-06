import React from 'react';
import { FormContext } from './context';
import { Rule } from './types';

export interface FormItemProps {
  name?: string;
  label?: string;
  labelWidth?: number;
  rules?: Rule[];
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const { name, label, labelWidth, rules, children } = props;

  const store = React.useContext(FormContext);

  const [, forceUpdate] = React.useReducer((c) => c + 1, 0);

  // 将变更控制权交给 store
  React.useEffect(() => {
    if (name) {
      return store.registerFormItem({ props, update: forceUpdate });
    }
  }, [name, props, store]);

  // 注册规则
  React.useEffect(() => {
    if (name && rules && rules.length > 0) {
      for (const rule of rules) {
        store.addRule(name, rule);
      }
      return () => {
        for (const rule of rules) {
          store.removeRule(name, rule);
        }
      };
    }
  }, [name, rules, store]);
  console.log('rerender FormItem', name);
  const getControls = () => ({
    value: name && store.getItemValue(name),
    onChange(e) {
      console.log('Form Element ', e.target);
      console.log('Form Element Value', e.target.value);
      name && store.setItemValues({ [name]: e.target.value });
    },
  });

  const errors = name ? store.getItemErrors(name) : undefined;

  const childNode = React.isValidElement(children)
    ? React.cloneElement(children, { ...children.props, ...getControls() })
    : children;

  const renderErrors = (errors?: Rule[]): React.ReactNode => {
    if (errors && errors.length > 0) {
      return (
        <div>
          {errors.map((err, idx) => (
            <p key={idx}>{err.message}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="form-item">
      {childNode} {renderErrors(errors)}
    </div>
  );
};
