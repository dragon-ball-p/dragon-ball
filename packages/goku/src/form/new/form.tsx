import React from 'react';
import { FormStore } from './store';
import { FormContext } from './context';
import { Values } from './types';

export interface FormProps {
  form?: FormStore;
  onSubmit?: (values: Values) => void;
  onSubmitFailed?: (err: Error) => void;
}

export const Form: React.FC<FormProps> = (props) => {
  const { form, onSubmit, children } = props;
  const { Provider } = FormContext;

  const store = form || new FormStore();
  const _onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // todo validate
    const values = store.getItemValues();
    console.log('values:: ', values);
    onSubmit && onSubmit(values);
  };

  return (
    <Provider value={store}>
      <form className="form" onSubmit={_onSubmit}>
        {children}
      </form>
    </Provider>
  );
};
