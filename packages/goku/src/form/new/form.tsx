import React from 'react';
import { FormStore } from './store';
import { FormContext } from './context';
import { Values } from './types';

export interface FormProps {
  form?: FormStore;
  onSubmit?: (values: Values) => void;
  onSubmitFailed?: (err: Error) => void;
}

const _Form: React.ForwardRefRenderFunction<FormStore, FormProps> = (props, ref) => {
  const { form, onSubmit, children } = props;
  const { Provider } = FormContext;
  const store = form || new FormStore();

  React.useImperativeHandle(ref, () => store);

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
_Form.displayName = 'Form';

const Form = React.forwardRef(_Form);

export { Form };
