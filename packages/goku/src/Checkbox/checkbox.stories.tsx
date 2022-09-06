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
  subcomponents: { CheckboxGroup },
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
  const items = ['one', 'two', 'three', 'four', 'five'];
  const [allChecked, setAllChecked] = React.useState(args.checked || args.defaultChecked || false);
  const [checkedList, setCheckedList] = React.useState<string[]>(allChecked ? items.filter((item) => item) : []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedList(items.filter((item) => item));
    } else {
      setCheckedList([]);
    }
    setAllChecked(e.target.checked);
  };
  const onGroupChange = (checkedList: string[], isAllChecked: boolean) => {
    console.log('onGroupChange::', checkedList, isAllChecked);
    setAllChecked(isAllChecked);
    setCheckedList(checkedList);
  };
  return (
    <div>
      <Checkbox checked={allChecked} onChange={onChange}>
        全选
      </Checkbox>
      <CheckboxGroup value={checkedList} onChange={onGroupChange} items={items} />
    </div>
  );
};
Dynamic.args = {
  defaultChecked: false,
  checked: true,
  size: 'normal',
};
Dynamic.storyName = '动态示例';
