import React from 'react';
import { Form } from '@dragon-ball/goku';

const Page: React.FC = function () {
  function onSubmit(e) {
    console.log('eeee ', e);
  }
  return (
    <div className="control is-loading">
      <Form onSubmit={onSubmit}>
        <Form.Item label="label1" labelWidth={10}>
          <span>label1</span>
        </Form.Item>
        <Form.Item label="label2" labelWidth={10}>
          <span>label1</span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;
