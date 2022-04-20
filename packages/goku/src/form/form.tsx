import React, { PropsWithChildren, FormEventHandler, FormHTMLAttributes } from 'react';
import { FormItemProps, FormItem } from './form-item';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: FormEventHandler;
}

export interface IForm extends React.FC<PropsWithChildren<FormProps>> {
  Item: React.FC<PropsWithChildren<FormItemProps>>;
}

const Form: IForm = function (props) {
  return <form onSubmit={props.onSubmit}>{props.children}</form>;
};
Form.Item = FormItem;

export { Form };
