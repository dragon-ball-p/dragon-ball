import React, { useContext, useEffect } from 'react';
import { isRequired } from './store';
import { FormInstanceContext } from './context';
import { Rule } from './types';

export interface FormItemProps {
  label: string;
  labelWidth?: number;
  required?: boolean;
  name?: string;
  children?: React.ReactElement;
  rules?: Rule[];
}

function FormItem(props: FormItemProps): React.ReactElement {
  const { label, labelWidth, name, children, required, rules, ...restProps } = props;
  // const [value, setValue] = useState(null);

  const ctx = useContext(FormInstanceContext);

  useEffect(() => {
    if (!name) return;
    if (required) {
      ctx.addRule(name, isRequired);
    }
    if (rules) {
      rules.forEach((item) => {
        ctx.addRule(name, item);
      });
    }
    return () => {
      if (required) {
        ctx.removeRule(name, isRequired);
      }
      if (rules) {
        rules.forEach((item) => {
          ctx.removeRule(name, item);
        });
      }
    };
  }, [ctx, name, required, rules]);

  if (children === undefined || children === null || typeof children === 'boolean') {
    return <></>;
  }

  let childNode: React.ReactNode = null;
  if (Array.isArray(children)) {
    childNode = children;
    // } else if (isRenderProps) {
    // todo
  } else {
    // 确保有 name
    const childrenProps = {
      ...restProps,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (children.type) {
          case 'input':
            console.log('input change', e.target.value);
            break;
          case 'select':
            console.log('select change');
            break;
          default:
            console.log('others change', children.type);
        }
        console.log('input change1111', children.type);
        console.log('input change2222', children);
        console.log('input change3333', e.target.value);
        console.log('input change4444', e.target);
        console.log('input change5555', e);
        // onBlur();
        // todo - debounce;
        ctx.setItem(name as string, e.target.value);
        children.props.onChange?.apply(children, e);
      },
    };
    childNode = React.cloneElement(children, childrenProps);
  }

  const width = labelWidth ? labelWidth : 80;

  return (
    <div className="field">
      <label className="label" style={{ width }}>
        {label}
      </label>
      {childNode}
    </div>
  );
}

export { FormItem };
