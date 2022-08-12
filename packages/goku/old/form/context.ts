import { createContext } from 'react';
import { FormInstance } from './types';

export const FormInstanceContext = createContext<FormInstance>({} as FormInstance);
