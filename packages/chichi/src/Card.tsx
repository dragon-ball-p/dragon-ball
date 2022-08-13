import React from 'react';
import { Button, Card } from '@dragon-ball/goku';

const Page: React.FC = function () {
  const [v, setV] = React.useState(0);
  const handleClick = () => {
    setV(v + 1);
  };
  return (
    <Card title="card" type="inner">
      <div>Hello world. v: {v} </div>
      <div>
        <Button onClick={handleClick}>ClickMe</Button>
      </div>
      Card Content.
    </Card>
  );
};

export default Page;
