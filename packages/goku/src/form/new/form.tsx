import React from 'react';
import { ErrorCache, FormStore } from './store';
import { FormContext } from './context';
import { Values } from './types';

export interface FormProps {
  form?: FormStore;
  onSubmit?: (values: Values) => void;
  onSubmitFailed?: (errors: ErrorCache, values: Values) => void;
}

const _Form: React.ForwardRefRenderFunction<FormStore, FormProps> = (props, ref) => {
  const { form, onSubmit, onSubmitFailed, children } = props;
  const { Provider } = FormContext;
  const store = form || new FormStore();

  React.useImperativeHandle(ref, () => store);

  const _onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const values = store.getItemValues();
    Object.keys(values).forEach((key) => {
      store.validate(key, values[key]);
    });
    console.log('values:: ', values);
    const errors = store.getErrors();
    if (Object.keys(errors).length > 0) {
      onSubmitFailed && onSubmitFailed(errors, values);
    } else {
      onSubmit && onSubmit(values);
    }
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
