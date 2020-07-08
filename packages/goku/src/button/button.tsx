import * as React from 'react';


type ButtonTypes = 'default' | 'primary' | 'link';
type ButtonSize = 'lg' | 'md' | 'sm';
type ButtonShape = '' | '';
// type ButtonHTMLType = 'button' | 'a' | 'submit' | 'reset';

export interface ButtonProps {
  type?: ButtonTypes;
  size?: ButtonSize;
  shape?: ButtonShape;


  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const IButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {

}

const Button = React.forwardRef<unknown, ButtonProps>(IButton);

export default Button;