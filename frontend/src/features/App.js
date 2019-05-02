import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { AnimatedSwitch } from 'react-router-transition';

import InitPlayer from './Init/InitPlayer';
import GameMode from './Init/GameMode';
import Battle from './Battle/Battle';

import './App.css';

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
        <Route path='/battle' component={Battle} />
        <Route path='/battle/:battleUUID' component={() => <p>test</p>} />
        <Route render={() => <p>Not Found</p>} />
      </AnimatedSwitch>
    );
  }
}

export default hot(App);
