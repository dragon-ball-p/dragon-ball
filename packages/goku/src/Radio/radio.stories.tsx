import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RadioGroup } from './radio-group';
import { Radio } from './radio';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Radio 单选框',
  component: RadioGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  subcomponents: { Radio },
} as ComponentMeta<typeof Radio>;

export const Static: ComponentStory<typeof Radio> = () => {
  const one = { name: '一' };
  const two = { age: 2 };
  const three = { address: 'road 1' };
  return (
    <RadioGroup name="static" defaultValue={two}>
      <Radio value={one}>一</Radio>
      <Radio value={two}>二</Radio>
      <Radio value={three}>三</Radio>
    </RadioGroup>
  );
};
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Radio> = (args) => {
  const one = { name: '一' };
  const two = { age: 2 };
  const three = { address: 'road 1' };
  const [value, setValue] = React.useState<any>(two);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('checked ?: ', e.target.checked);
    setValue(e.target.value);
  };
  return (
    <RadioGroup {...args} name="dynamic" value={value} onChange={onChange}>
      <Radio value={one}>一</Radio>
      <Radio value={two}>二</Radio>
      <Radio value={three}>三</Radio>
    </RadioGroup>
  );
};
Dynamic.args = {
  size: 'normal',
};
Dynamic.storyName = '动态示例';
