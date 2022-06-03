import React from 'react';
import { Form, FormItem, FormInstance, Input } from '@dragon-ball/goku';

const Page: React.FC = function () {
  const ref = React.useRef<FormInstance>(null);
  function onSubmit(e) {
    console.log('eeee ', e);
    console.log('rrrr ', ref);
    (window as any).x = ref;
  }

  return (
    <>
      <Form onSubmit={onSubmit} ref={ref} form={{ name1: '1' }}>
        <FormItem label="label0" labelWidth={10}>
          <div className="control">label0</div>
        </FormItem>
        <FormItem name="name1" label="label1">
          <Input defaultValue="sss" />
        </FormItem>
        <FormItem name="name2" label="label2" required>
          <input />
        </FormItem>
        <FormItem name="name3" label="label3" required>
          <input type="checkbox" />
        </FormItem>
        <FormItem name="name4" label="label4" required>
          <fieldset>
            <legend>Select a maintenance drone:</legend>
            <div>
              <input type="radio" id="huey" name="drone" value={'huey'} defaultChecked={true} />
              <label htmlFor="huey">Huey</label>
            </div>
            <div>
              <input type="radio" id="dewey" name="drone" value={1} />
              <label htmlFor="dewey">Dewey</label>
            </div>
            <div>
              <input type="radio" id="louie" name="drone" value={['1', '2', '3']} />
              <label htmlFor="louie">Louie</label>
            </div>
          </fieldset>
        </FormItem>
        <FormItem>
          <input type="submit" />
        </FormItem>
      </Form>
    </>
  );
};

export default Page;
