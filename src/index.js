import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './polyfills';

import { rematchStore } from 'src/store/rematch';

import './utils/initFA';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/theme.scss';

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
