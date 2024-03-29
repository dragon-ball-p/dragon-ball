import React from 'react';
import { Button, notification } from '@dragon-ball/goku';

const Page: React.FC = function () {
  const handleClick = React.useCallback(() => {
    notification.open({
      key: 111,
      content: 'test',
    });
  }, []);
  return (
    <div>
      <Button onClick={handleClick}>notify</Button>
    </div>
  );
};

export default Page;
