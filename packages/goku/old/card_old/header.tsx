import * as React from 'react';
import classNames from 'classnames';

export interface CardHeaderProps {
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
}

export const CardHeader: React.FC<React.PropsWithChildren<CardHeaderProps>> = (props) => {
  const { icon, className, style, prefix, children, ...others } = props;

  const cls = classNames(`${prefix}card-header`, className);
  const tcls = classNames(`${prefix}card-header-title`);
  const icls = classNames(`${prefix}card-header-icon`);

  return (
    <header {...others} className={cls} style={style}>
      <div className={tcls}>{children}</div>
      {icon ? <div className={icls}></div> : null}
    </header>
  );
};

CardHeader.defaultProps = {
  prefix: '',
};

CardHeader.displayName = 'CardHeader';
