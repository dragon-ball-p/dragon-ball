import * as React from 'react';
import classNames from 'classnames';

export interface CardFooterProps {
  items?: Array<React.ReactNode>;
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
}

export const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = (props) => {
  const { items, className, style, prefix, children, ...others } = props;

  const cls = classNames(`${prefix}card-footer`, className);
  const icls = classNames(`${prefix}card-footer-item`);

  return (
    <footer {...others} className={cls} style={style}>
      {items?.map((item, idx) => (
        <p key={idx} className={icls}>
          {item}
        </p>
      ))}
      {children}
    </footer>
  );
};

CardFooter.defaultProps = {
  prefix: '',
};

CardFooter.displayName = 'CardFooter';
