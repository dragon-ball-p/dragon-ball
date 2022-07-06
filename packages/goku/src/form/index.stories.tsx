import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// import { Form } from './form';
import { Form, FormItem, useForm, FormStore } from './new';

console.log('ffff', Form, FormItem);
export default {
  title: 'Form 表单',
  component: Form,
  subcomponents: { FormItem },
} as ComponentMeta<typeof Form>;

export const Empty: ComponentStory<typeof Form> = (args) => <Form {...args} />;

const Input = (props) => {
  return <input type="text" {...props} />;
};
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

const nameRules = { required: true, message: '请输入姓名！' };
class WrappedForm extends React.Component {
  ref = React.createRef<FormStore>();
  onSubmit = (values) => {
    console.log('this.ref', this.ref);
    console.log('on Submittttt ', values);
  };
  render() {
    return (
      <Form ref={this.ref} onSubmit={this.onSubmit}>
        {/* <FormItem name="input" rules={[nameRules]}> */}
        <FormItem name="input">
          <Input />
        </FormItem>
        <FormItem>
          <button type="submit">Submit3</button>
        </FormItem>
      </Form>
    );
  }
}
export const FF: ComponentStory<typeof Form> = (args) => {
  return <WrappedForm {...args}></WrappedForm>;
};
