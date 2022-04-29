import React, { useState, FormEventHandler, FormHTMLAttributes } from 'react';
// import { FormItem } from './form-item';
import { FormInstanceContext } from './context';
import { FormStore } from './store';
import { Value, Values, FormInstance } from './types';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onReset?: FormEventHandler;
  onSubmit?: FormEventHandler;
  form: Values;
}

// export interface IForm extends React.ForwardRefRenderFunction {
//   Item: typeof FormItem;
// }

export function useForm(defaultValues: Values): FormInstance {
  const [store] = useState(new FormStore(defaultValues));
  (window as any).p = store;

  const instance: FormInstance = React.useMemo(() => {
    return {
      getItem: (name) => {
        return store.get(name) as Value;
      },
      setItem: (name, value) => {
        if (store.validate(name, value)) {
          store.set(name, value);
          // re-render FormItem
        } else {
          // todo - re-render errors, but not re-render values
        }
      },
      addRule: (name, rule) => {
        store.addRule(name, rule);
      },
      removeRule: (name, rule) => {
        store.removeRule(name, rule);
      },
    };
  }, [store]);

  return instance;
}

const InternalForm = function (props: React.PropsWithoutRef<FormProps>, ref: React.RefObject<FormInstance>) {
  // const InternalForm: React.ForwardRefRenderFunction<FormInstance, FormProps> = function (props, ref) {
  const instance = useForm({ ...props.form });

  React.useImperativeHandle(ref, () => instance);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('From::onSubmit::', e);

    props.onSubmit && props.onSubmit(e);
  }

  return (
    <FormInstanceContext.Provider value={instance}>
      <form onSubmit={onSubmit}>{props.children}</form>
    </FormInstanceContext.Provider>
  );
};

// interface IForm extends React.ForwardRefExoticComponent<FormProps & React.RefAttributes<FormInstance>> {
//   // Item: typeof FormItem;
// }
// type IForm = React.ForwardRefExoticComponent<FormProps & React.RefAttributes<FormInstance>>;

const Form = React.forwardRef(InternalForm);
// const Form: IForm = React.forwardRef(InternalForm);
// (Form as IForm).Item = FormItem;

export { Form };
