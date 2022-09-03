import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radio } from './radio';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Radio 单选框',
  component: Radio,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Radio>;

export const Static: ComponentStory<typeof Radio> = () => <Radio>Radio (非受控)</Radio>;
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Radio> = (args) => {
  const [checked, setChecked] = React.useState(args.checked || args.defaultChecked || false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('checked ?: ', e.target.checked);
    setChecked(e.target.checked);
  };
  return (
    <Radio {...args} checked={checked} onChange={onChange}>
      Radio (受控)
    </Radio>
  );
};
Dynamic.args = {
  defaultChecked: false,
  checked: true,
  size: 'normal',
};
Dynamic.storyName = '动态示例';
