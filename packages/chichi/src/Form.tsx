import React from 'react';
import { Form, FormItem, Input } from '@dragon-ball/goku';

const Page: React.FC = function () {
  // const ref = React.useRef<FormInstance>();
  function onSubmit(e) {
    console.log('eeee ', e);
  }
  return (
    <Form onSubmit={onSubmit} form={{ name1: '1' }}>
      <FormItem label="label0" labelWidth={10}>
        <div className="control">label0</div>
      </FormItem>
      <FormItem name="name1" label="label1">
        <Input defaultValue="name1"></Input>
      </FormItem>
      <FormItem name="name2" label="label2" required>
        <input defaultValue="name2"></input>
      </FormItem>
      <FormItem name="name3" label="label3" required>
        <input type="checkbox" defaultChecked={true}></input>
      </FormItem>
      {/* <FormItem name="name3" label="label3" required>
        <input type="radio" defaultValue={true}></input>
      </FormItem> */}
    </Form>
  );
};

export default Page;
