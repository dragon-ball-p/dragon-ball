import * as React from 'react';
import classNames from 'classnames';

export interface CardFooterProps {
  items?: Array<React.ReactNode>;
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
  children?: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = (props) => {
  const { items, className, style, prefix, children, ...others } = props;

  const cls = classNames(`${prefix}card-footer`, className);
  const icls = classNames(`${prefix}card-footer-item`);

  return (
    <footer {...others} className={cls} style={style}>
      {items?.map((item) => (
        <p className={icls}>{item}</p>
      ))}
      {children}
    </footer>
  );
};

CardFooter.defaultProps = {
  prefix: '',
};

CardFooter.displayName = 'CardFooter';

export default CardFooter;
