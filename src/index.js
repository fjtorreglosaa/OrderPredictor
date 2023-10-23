import React from 'react';
import ReactDOM from 'react-dom/client';
import {ForecasterApp} from './ForecasterApp';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ForecasterApp/>
    </BrowserRouter>
  </React.StrictMode>
);
