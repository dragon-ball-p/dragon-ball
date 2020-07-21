import * as React from 'react';
import classNames from 'classnames';
import CardHeader, { CardHeaderProps } from './header';
import CardImage, { CardImageProps } from './image';
import CardContent, { CardContentProps } from './content';
import CardFooter, { CardFooterProps } from './footer';

/**
 * todo
 * 1. loading
 *
 */
export interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
  children?: React.ReactNode;
}

export interface CardInterface extends React.FC<CardProps> {
  Header: React.FC<CardHeaderProps>;
  Image: React.FC<CardImageProps>;
  Content: React.FC<CardContentProps>;
  Footer: React.FC<CardFooterProps>;
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

Card.Header = CardHeader;
Card.Image = CardImage;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
