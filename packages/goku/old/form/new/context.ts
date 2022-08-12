import React from 'react';
import { FormStore } from './store';

export const FormContext = React.createContext<FormStore>(new FormStore());
