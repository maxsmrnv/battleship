import React, { useMemo } from 'react';
import { Provider } from 'mobx-react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { InitGame } from './features/InitGame';
import { InitPlayer } from './features/InitPlayer';
import { Game } from './features/Game';
import { rootStore } from './rootStore';

const App = () => {
  return (
    <Provider {...rootStore}>
      <BrowserRouter basename={'/'}>
        <Switch>
          <Route exact path='/' component={InitPlayer} />
          <Route path='/initgame' component={InitGame} />
          <Route exact path='/game' component={useMemo(() => Game, [])} />
          <Route render={() => <p>Not Found</p>} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
