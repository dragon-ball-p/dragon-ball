import { Value, Values } from './types';

export class FormStore {
  values: Values = {};

  // Item 改变时，保存到 store 中
  setItemValues = (values: Values): void => {
    // todo - 触发 validate
    this.values = { ...this.values, ...values };
    console.log('setItemValues', this.values);
    // 保存后，触发 Item Element 的更新
  };
  getItemValue = (name: string): Value => {
    return this.values[name];
  };
  getItemValues = (): Values => {
    console.log('getItemValues', this.values);
    return { ...this.values };
  };

  // getInstance = () => {
  // }
}
