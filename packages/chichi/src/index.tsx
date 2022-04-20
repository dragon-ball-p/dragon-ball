import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);
