import React from 'react';
import { observer } from 'mobx-react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';

import { Button } from '../../components/Button';
import { BattleArea } from './BattleArea';

const StyledArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr 1fr;
  justify-items: center;
  align-items: center;
`;

export const InitGame = observer(({ history }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    history.push('game');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={submitHandler}>
        <StyledArea>
          <h3>drag to move / tap to rotate</h3>
          <BattleArea />
          <Button>Start</Button>
        </StyledArea>
      </form>
    </DndProvider>
  );
});

export default InitGame;
