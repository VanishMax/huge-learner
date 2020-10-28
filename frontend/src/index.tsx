import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

Sentry.init({
  dsn: 'https://c24719dfd7314f37bb41c5f614f4f22a@o380629.ingest.sentry.io/5495860',
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
