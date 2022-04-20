import React from 'react';
import { Card, Title } from '@dragon-ball/goku';

const Page: React.FC = function () {
  return (
    <Card>
      <Card.Header>
        <Title size="1">chichi</Title>
      </Card.Header>
      <Card.Image>
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="test" />
      </Card.Image>
      <Card.Content>
        <Title size="3">app</Title>
      </Card.Content>
      <Card.Footer items={['left', 'center', 'right']}>footer</Card.Footer>
    </Card>
  );
};

export default Page;
