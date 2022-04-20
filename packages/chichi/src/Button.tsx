import React, { useState } from 'react';
import { Button } from '@dragon-ball/goku';

const Page: React.FC = function () {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button type="primary" onClick={() => setCount(count + 1)}>
        Clicked({count})
      </Button>
    </div>
  );
};

export default Page;
