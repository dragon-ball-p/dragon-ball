import * as React from 'react';
import classNames from 'classnames';

export interface CardImageProps {
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
}

export const CardImage: React.FC<React.PropsWithChildren<CardImageProps>> = (props) => {
  const { className, style, prefix, children, ...others } = props;

  const cls = classNames(`${prefix}card-image`, className);

  return (
    <div {...others} className={cls} style={style}>
      {children}
    </div>
  );
};

CardImage.defaultProps = {
  prefix: '',
};

CardImage.displayName = 'CardImage';
