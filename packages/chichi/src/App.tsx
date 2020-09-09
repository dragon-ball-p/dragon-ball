// import React, { Component } from 'react';
import * as React from 'react';
import { Button, Title, Card, Input } from '@dragon-ball/goku';

export default function (): React.ReactElement {
  const [count, setCount] = React.useState(0);

  return (
    <Card>
      <Card.Header title="chichi" />
      <Card.Content>
        <Title size="h1" text="APP" />
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
