import React from 'react';
import ReactDOM from 'react-dom';
import App from './features/App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import playerStore from './stores/playerStore';

const stores = { playerStore };

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
