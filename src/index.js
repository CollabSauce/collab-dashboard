import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import './polyfills';

import { rematchStore } from 'src/store/rematch';

import './utils/initFA';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/theme.scss';

if (process.env.REACT_APP_ENV !== 'development' && process.env.REACT_APP_SENTRY_RELEASE) {
  Sentry.init({
    dsn: 'https://d26e9764c78a4016a76d98e088c465ba@o460199.ingest.sentry.io/5460198',
    release: process.env.REACT_APP_SENTRY_RELEASE,
    environment: process.env.REACT_APP_ENV,
    integrations: [new Integrations.BrowserTracing()],

    // Sentry recommends adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: process.env.REACT_APP_ENV === 'production' ? 1.0 : 0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={rematchStore}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
