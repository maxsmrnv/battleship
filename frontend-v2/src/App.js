import React from 'react';
import { Provider } from 'mobx-react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { BattleArea } from './features/Game/BattleArea';
import { InitPlayer } from './features/InitGame';
import { rootStore } from './rootStore';

const App = () => {
  return (
    <Provider {...rootStore}>
      <BrowserRouter basename={'/'}>
        <Switch>
          <Route exact path="/" component={InitPlayer} />
          <Route path="/battle" component={BattleArea} />
          <Route render={() => <p>Not Found</p>} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default hot(App);
