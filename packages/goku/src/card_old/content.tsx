import * as React from 'react';
import classNames from 'classnames';

export interface CardContentProps {
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
}

export const CardContent: React.FC<CardContentProps> = (props) => {
  const { className, style, prefix, children, ...others } = props;

  const cls = classNames(`${prefix}card-content`, className);

  return (
    <div {...others} className={cls} style={style}>
      {children}
    </div>
  );
};

CardContent.defaultProps = {
  prefix: '',
};

CardContent.displayName = 'CardContent';
