import * as React from 'react';
import classNames from 'classnames';

export interface CardHeaderProps {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
  children?: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const { title, icon, className, style, prefix, children, ...others } = props;

  const cls = classNames(`${prefix}card-header`, className);
  const tcls = classNames(`${prefix}card-header-title`);
  const icls = classNames(`${prefix}card-header-icon`);

  return (
    <header {...others} className={cls} style={style}>
      {title ? <p className={tcls}>title</p> : null}
      {children}
      {icon ? <p className={icls}></p> : null}
    </header>
  );
};

CardHeader.defaultProps = {
  prefix: '',
};

CardHeader.displayName = 'CardHeader';

export default CardHeader;
