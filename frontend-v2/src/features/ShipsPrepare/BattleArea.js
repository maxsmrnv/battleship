import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { Button } from '../../components/Button';

import Area from './Area';

const StyledArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr 1fr;
  justify-items: center;
  align-items: center;
`;

export const BattleArea = () => {
  const handleClick = () => {
    console.log('send post reqest /initgame');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledArea>
        <h3>drag to move / tap to rotate</h3>
        <Area />
        <Button onClick={handleClick}>Start</Button>
      </StyledArea>
    </DndProvider>
  );
};
