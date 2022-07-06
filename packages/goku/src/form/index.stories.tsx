import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// import { Form } from './form';
import { Form } from './new/form';
import { FormItem } from './new/form-item';
// import { Form, FormItem, useForm } from './new/form';
// import { Form, FormItem, useForm } from './bubucuo';

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
    <button type="submit">Submit</button>
  </Form>
);

// const nameRules = { required: true, message: '请输入姓名！' };
// export const FF: ComponentStory<typeof Form> = (args) => {
//   const [form] = useForm();
//   const onF = (d) => console.log(d);
//   const onFF = (e) => console.log(e);
//   return (
//     <Form {...args} onFinish={onF} onFinishFailed={onFF} form={form}>
//       <FormItem name="input" rules={[nameRules]}>
//         <Input />
//       </FormItem>
//       <FormItem>
//         <button type="submit">Submit</button>
//       </FormItem>
//     </Form>
//   );
// };
