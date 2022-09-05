import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from './checkbox';
import { CheckboxGroup } from './checkbox-group';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Checkbox 多选框',
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Checkbox>;

export const Static: ComponentStory<typeof Checkbox> = () => {
  return (
    <div>
      <Checkbox>Checkbox (非受控)</Checkbox>

      <div>
        <CheckboxGroup items={['one', 'two', 'three', 'four', 'five']} defaultValue={['two', 'four']}></CheckboxGroup>
      </div>
    </div>
  );
};
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = React.useState(args.checked || args.defaultChecked || false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('checked ?: ', e.target.checked);
    setChecked(e.target.checked);
  };
  return (
    <Checkbox {...args} checked={checked} onChange={onChange}>
      Checkbox (受控)
    </Checkbox>
  );
};
Dynamic.args = {
  defaultChecked: false,
  checked: true,
  size: 'normal',
};
Dynamic.storyName = '动态示例';
