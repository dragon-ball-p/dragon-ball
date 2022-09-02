import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from './checkbox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Checkbox 按钮',
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Checkbox>;

export const Static: ComponentStory<typeof Checkbox> = () => {
  const [checked, setChecked] = React.useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('checked ?: ', e.target.checked);
    setChecked(e.target.checked);
  };
  return (
    <Checkbox checked={checked} onChange={onChange}>
      Checkbox
    </Checkbox>
  );
};
Static.storyName = '静态示例';

/*
export const Dynamic: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args}>Checkbox</Checkbox>;
Dynamic.args = {
  defaultChecked: true,
  onChange: (checked: boolean) => {
    console.log('Checkbox is checked ? ', checked);
  },
};
Dynamic.storyName = '动态示例';
*/
