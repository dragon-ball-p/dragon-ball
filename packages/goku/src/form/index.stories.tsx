import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// import { Form } from './form';
import { Form, FormItem, useForm, FormStore } from './new';
import { Input } from '../input_old';

console.log('ffff', Form, FormItem);
export default {
  title: 'Form 表单',
  component: Form,
  subcomponents: { FormItem },
} as ComponentMeta<typeof Form>;

export const Empty: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const OneItem: ComponentStory<typeof Form> = (args) => (
  <Form {...args}>
    <FormItem name="input">
      <Input />
    </FormItem>
    <button type="submit">Submit1</button>
  </Form>
);

export const TwoItem: ComponentStory<typeof Form> = (args) => {
  const [form] = useForm();
  return (
    <Form form={form} {...args}>
      <FormItem name="input">
        <Input />
      </FormItem>
      <button type="submit">Submit2</button>
    </Form>
  );
};

const initialValues = { name: '张三', password: '123456' };
const nameRules = { required: true, message: '请输入姓名！' };
const passwdRules = { required: true, message: '请输入密码！' };
export const FF: ComponentStory<typeof Form> = (args) => {
  const ref = React.useRef<FormStore>(null);
  const onSubmit = (values) => {
    console.log('this.ref', ref);
    console.log('on Submittttt ', values);
  };
  const onSubmitFailed = (errors, values) => {
    console.log('this.ref', ref);
    console.log('on SubmitttttFailed ', errors, values);
  };
  return (
    <Form ref={ref} initialValues={initialValues} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed} {...args}>
      <FormItem label="姓名" name="name" rules={[nameRules]}>
        <Input />
      </FormItem>
      <FormItem label="密码" name="password" rules={[passwdRules]}>
        <Input />
      </FormItem>
      <FormItem label="别名" name="alias" rules={[{ min: 2 }, { max: 10 }, { required: true }]}>
        <Input defaultValue="小三" />
      </FormItem>
      <FormItem label="输入框" name="input">
        <Input />
      </FormItem>
      <FormItem>
        <button type="submit">Submit3</button>
      </FormItem>
    </Form>
  );
};
