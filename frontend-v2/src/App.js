import React from 'react';
import { Provider } from 'mobx-react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { BattleArea } from './features/ShipsPrepare';
import { InitPlayer } from './features/InitGame';
import { rootStore } from './rootStore';

const App = () => {
  return (
    <Provider {...rootStore}>
      <BrowserRouter basename={'/'}>
        <Switch>
          <Route exact path='/' component={InitPlayer} />
          <Route path='/game' component={BattleArea} />
          <Route render={() => <p>Not Found</p>} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
