import React from 'react';
import ReactDOM from 'react-dom';
import App from './features/App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import playerStore from './stores/playerStore';
import chatStore from './stores/chatStore';

const stores = { playerStore, chatStore };

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App />
      <DevTools />
    </Router>
  </Provider>,
  document.getElementById('root')
);
