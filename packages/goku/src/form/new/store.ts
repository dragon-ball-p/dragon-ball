import { FormItemProps } from './form-item';
import { Rule, Value, Values } from './types';

interface RuleCache {
  [k: string]: Rule[];
}
export interface ErrorCache {
  [k: string]: Rule[];
}
export interface ItemCache {
  props: React.PropsWithChildren<FormItemProps>;
  update: () => void;
}
export class FormStore {
  values: Values = {};
  rules: RuleCache = {};
  errors: ErrorCache = {};
  itemCaches: ItemCache[] = [];

  constructor(initialValues?: Values) {
    this.values = { ...this.values, ...initialValues };
  }

  registerFormItem = (cache: ItemCache): (() => void) => {
    this.itemCaches.push(cache);
    return () => {
      this.itemCaches = this.itemCaches.filter((_cache) => _cache !== cache);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      delete this.errors[cache.props.name!];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      delete this.rules[cache.props.name!];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      delete this.values[cache.props.name!];
    };
  };

  // Item 改变时，保存到 store 中
  setItemValues = (values: Values): void => {
    this.values = { ...this.values, ...values };
    console.log('setItemValues', this.values);
    // 触发 validate
    for (const name of Object.keys(values)) {
      this.validate(name, values[name]);
      // 触发 Item Element 的更新
      const item = this.itemCaches.find((_item) => _item.props.name == name);
      item && item.update();
    }
  };
  getItemValue = (name: string): Value => {
    console.log('getItemValue', this.values[name]);
    return this.values[name];
  };
  getItemValues = (): Values => {
    console.log('getItemValues', this.values);
    return { ...this.values };
  };

  addRule = (name: string, rule: Rule): void => {
    if (!this.rules[name]) {
      this.rules[name] = [];
    }
    this.rules[name] = this.rules[name].filter((_rule) => _rule !== rule);
    this.rules[name].push(rule);
  };
  removeRule = (name: string, rule: Rule): void => {
    if (!this.rules[name]) {
      return;
    }
    this.rules[name] = this.rules[name].filter((_rule) => _rule !== rule);
    if (this.rules[name].length === 0) {
      delete this.rules[name];
    }
  };
  validate = (name: string, value: Value): void => {
    const rules = this.rules[name];
    const errors: Rule[] = [];
    if (rules) {
      for (const rule of rules) {
        // required
        // min
        // max
        // pattern
        // validator
        if (
          (rule.required && !value) ||
          (rule.min && (!value || value.length < rule.min)) ||
          (rule.max && value && value.length > rule.max) ||
          (rule.pattern && !rule.pattern.test(value)) ||
          (rule.validator && !rule.validator(value))
        ) {
          errors.push({ message: 'value is invalid', ...rule });
        }
      }
    }
    this.errors[name] = errors;
  };
  getItemErrors = (name: string): Rule[] | undefined => {
    return this.errors[name];
  };
  getErrors = (): ErrorCache => {
    return { ...this.errors };
  };

  // getInstance = () => {
  // }
}
