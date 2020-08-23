import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.output.css';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./test/server/dev-server'); // eslint-disable-line
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
