import * as React from 'react';
import classNames from 'classnames';
import { CardHeader } from './header';
import { CardImage } from './image';
import { CardContent } from './content';
import { CardFooter } from './footer';

/**
 * todo
 * 1. loading
 *
 */
export interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
}

export interface CardInterface extends React.FC<React.PropsWithChildren<CardProps>> {
  Header: typeof CardHeader;
  Image: typeof CardImage;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
}

const Card: CardInterface = (props) => {
  const { className, style, prefix, children, ...others } = props;

  const classes = classNames(`${prefix}card`, className);
  return (
    <div {...others} className={classes} style={style}>
      {children}
    </div>
  );
};

Card.defaultProps = {
  prefix: '',
};

Card.displayName = 'Card';

// todo - 怎么能让业务侧识别出 Card.Header 的类型，目前被当成 any
Card.Header = CardHeader;
Card.Image = CardImage;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
