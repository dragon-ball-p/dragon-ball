import * as React from 'react';

export type SizeType = 'small' | 'medium' | 'large' | undefined;

const SizeContext = React.createContext<SizeType>(undefined);

export interface SizeContextProps {
  size?: SizeType;
}

export const SizeContextProvider: React.FC<React.PropsWithChildren<SizeContextProps>> = ({ children, size }) => (
  <SizeContext.Consumer>
    {(originSize) => <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>}
  </SizeContext.Consumer>
);

export default SizeContext;
