import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterView } from 'oh-router-react';
import { router } from './router';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterView router={router} />
  </React.StrictMode>
);