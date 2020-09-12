// import React, { Component } from 'react';
import * as React from 'react';
import { Button, Title, Card, Input } from '@dragon-ball/goku';

export default function (): React.ReactElement {
  const [count, setCount] = React.useState(0);

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
        <Button type="primary" onClick={() => setCount(count + 1)}>
          Clicked({count})
        </Button>
        <div className="control is-loading">
          <Input value={`${count}`}></Input>
        </div>
      </Card.Content>
      <Card.Footer items={['left', 'center', 'right']}>
        <Button>submit</Button>
      </Card.Footer>
    </Card>
  );
}
