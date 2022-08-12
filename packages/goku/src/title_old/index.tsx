import * as React from 'react';
import classNames from 'classnames';

export type TitleSize = '1' | '2' | '3' | '4' | '5' | '6';

export interface TitleProps {
  size?: TitleSize;
  prefix?: string;
}

export interface TitleInterface extends React.FC<React.PropsWithChildren<TitleProps>> {
  SubTitle?: React.FC<TitleProps>;
}

const Title: TitleInterface = (props) => {
  const { children, size, prefix, ...rest } = props;

  const classes = classNames(prefix, `is-${size}`);

  let tag;
  switch (size) {
    case '1':
      tag = (
        <h1 className={classes} {...rest}>
          {children}
        </h1>
      );
      break;
    case '2':
      tag = (
        <h2 className={classes} {...rest}>
          {children}
        </h2>
      );
      break;
    case '4':
      tag = (
        <h4 className={classes} {...rest}>
          {children}
        </h4>
      );
      break;
    case '5':
      tag = (
        <h5 className={classes} {...rest}>
          {children}
        </h5>
      );
      break;
    case '6':
      tag = (
        <h6 className={classes} {...rest}>
          {children}
        </h6>
      );
      break;
    case '3':
    default:
      tag = (
        <h3 className={classes} {...rest}>
          {children}
        </h3>
      );
      break;
  }
  return tag;
};

Title.defaultProps = {
  size: '3',
  prefix: 'title',
};

const SubTitle: React.FC<TitleProps> = (props) => {
  const { size } = props;

  switch (size) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
      break;
    default:
      props.size = '5';
  }
  return Title(props);
};

SubTitle.defaultProps = {
  size: '5',
  prefix: 'subtitle',
};

Title.SubTitle = SubTitle;

export default Title;
