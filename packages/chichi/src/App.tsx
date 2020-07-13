// import React, { Component } from 'react';
import * as React from 'react';
import { Button } from '@dragon-ball/goku';

export default function (): React.ReactElement {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      APP
      <Button onClick={() => setCount(count + 1)}>Clicked({count})</Button>
    </div>
  );
}
