import React from 'react';
import { observer } from 'mobx-react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Button } from '_components/Button';
import { Checkbox } from '_components/Checkbox';
import { useStores } from '_utils';
import { BattleArea } from './components/BattleArea';
import { StyledArea } from './style';

export const InitGame = observer(({ history }) => {
  const {
    shipsStore: { isPrivate, setIsPrivate },
  } = useStores();

  const submitHandler = (e) => {
    e.preventDefault();
    history.push('game');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={submitHandler}>
        <StyledArea>
          <h3>Drag to move / Tap to rotate</h3>
          <BattleArea />
          <Button>Start</Button>
          <Checkbox
            label="Private game"
            isChecked={isPrivate}
            onChange={setIsPrivate}
          />
        </StyledArea>
      </form>
    </DndProvider>
  );
});

export default InitGame;
