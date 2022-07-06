export type Value = string; // | boolean;
export interface Values {
  [k: string]: Value;
}

export interface Rule {
  // type: 'string' | 'number' | 'boolean' | 'url' | 'email',
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  message?: string;
  validator?: (v: Value) => boolean;
}
