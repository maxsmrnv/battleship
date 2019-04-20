import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { AnimatedSwitch } from 'react-router-transition';

import InitPlayer from './Init/InitPlayer';
import GameMode from './Init/GameMode';

class App extends Component {
  render() {
    return (
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 1 }}
        atActive={{ opacity: 1 }}
        className='switch-wrapper'
      >
        <Route exact path='/' component={InitPlayer} />
        <Route path='/game' component={GameMode} />
        <Route path='/battle' component={() => <h1>battle</h1>} />
      </AnimatedSwitch>
    );
  }
}

export default hot(App);
