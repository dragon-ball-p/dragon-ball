import { Rule, Rules, Value, Values, ValidationError, ValidationErrors } from './types';
// 用于存放表单数据、接受表单初始值，以及封装对表单数据的操作

export const isRequired: Rule = function (val: Value): ValidationError | undefined {
  console.log('isRequired', val);
  if (typeof val === 'undefined') {
    return {
      type: 'required',
      message: 'Value is Required but undefined',
    } as ValidationError;
  }
  if (val === null) {
    return {
      type: 'required',
      message: 'Value is Required, but null',
    } as ValidationError;
  }
  return;
};

export class FormStore {
  values: Values;
  defaultValues: Values;
  rules: Rules;
  errors: ValidationErrors;

  constructor(defaultValues: Values) {
    this.values = defaultValues || {};
    this.defaultValues = deepClone(defaultValues);
    this.rules = {};
    this.errors = {};
  }

  reset(): void {
    this.values = deepClone(this.defaultValues);
  }

  get(name?: string): Value | Values {
    if (name) {
      return this.values[name];
    }
    return this.values;
  }

  set(name: string, value: Value): void {
    this.values[name] = value;
    // todo - debounce - 在外层做？？？
  }

  addRule(name: string, rule: Rule): void {
    if (!this.rules[name]) {
      this.rules[name] = [];
    }
    this.rules[name].push(rule);
  }
  removeRule(name: string, rule: Rule): void {
    if (this.rules[name]) {
      const idx = this.rules[name].indexOf(rule);
      if (idx >= 0) {
        this.rules[name].splice(idx, 1);
      }
    }
  }

  validate(name?: string, value?: Value): boolean {
    let err: ValidationError | undefined;
    let res = true;
    if (name) {
      const val = value !== undefined ? value : this.values[name];
      const rules = this.rules[name];
      if (!rules) {
        return res;
      }
      for (const rule of rules) {
        err = rule(val);
        if (err) {
          res = false;
          this.errors[name] = err;
          return res;
        } else {
          this.errors[name] = null;
        }
      }
    } else {
      const names = Object.keys(this.rules);
      for (const _name of names) {
        if (!this.validate(_name, this.values[_name])) {
          res = false;
        }
      }
    }
    return res;
  }
}

// todo
function deepClone<T>(data: T, level?: number): T {
  if (level) {
    return data;
  }
  const res: T = {} as T;
  Object.keys(data).forEach((key) => {
    res[key] = deepClone(data[key], 1);
  });
  return res;
}
