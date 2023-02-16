/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import App from './App';
import './index.css';
import worker from './mocks/browser';

const container = document.getElementById('root');
const root = createRoot(container!);

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
