import React from 'react';
import { hot } from 'react-hot-loader/root';

import { BattleArea } from './features/Game/BattleArea';

function App() {
  return (
    <div className="App">
      <BattleArea />
    </div>
  );
}

export default hot(App);
