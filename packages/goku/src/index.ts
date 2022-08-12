export { default as Button } from './button_old';
export { default as Title } from './title_old';
export { default as Card } from './card_old';
export { default as Input } from './input_old';
export { default as notification } from './notification_old';
export { Form, FormItem, FormInstance } from './form';

export * from './Button';
export * from './Card';
export * from './Dropdown';
export * from './Icon';
export * from './Input';
export * from './Menu';
export * from './Modal';
export * from './Popover';
export * from './Select';
export * from './Tabs';
export * from './Tooltip';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const version: string = __VERSION__;

export { version };
