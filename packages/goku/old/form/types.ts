export type Value = string | number | boolean;
export type Values = Record<string, Value>;
export interface Rule {
  (value: Value): ValidationError | undefined;
}
export type Rules = Record<string, Rule[]>;
export interface ValidationError {
  type: string;
  message: string;
}
export type ValidationErrors = Record<string, ValidationError | null>;

export interface FormInstance {
  getItem(name: string): Value;
  setItem(name: string, value: Value): void;
  getItems(): Values;
  isValidated(): boolean;
  addRule(name: string, rule: Rule): void;
  removeRule(name: string, rule: Rule): void;
}
