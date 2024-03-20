import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/app';
import { Provider } from 'react-redux';
import { setupStore } from './components/store/store';
import { BrowserRouter } from 'react-router-dom';
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
const container = document.getElementById('root')!;
const root = createRoot(container);

const store = setupStore();

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
