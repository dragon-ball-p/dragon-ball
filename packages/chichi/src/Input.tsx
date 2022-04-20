import React, { useState } from 'react';
import { Input } from '@dragon-ball/goku';

const Page: React.FC = function () {
  const [count] = useState(0);
  return (
    <div className="control is-loading">
      {/* <Input value={`${count}`} onChange={setCount(count + 1)}></Input> */}
      <Input value={`${count}`}></Input>
    </div>
  );
};

export default Page;
