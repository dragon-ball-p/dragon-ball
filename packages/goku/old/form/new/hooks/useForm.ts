import React from 'react';
import { FormStore } from '../store';

export const useForm = (store?: FormStore): [FormStore] => {
  const formRef = React.useRef<FormStore>();

  if (!formRef.current) {
    if (store) {
      formRef.current = store;
    } else {
      formRef.current = new FormStore();
    }
  }

  return [formRef.current];
};
