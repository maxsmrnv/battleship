import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';

import Area from './Area';

const StyledArea = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

export const BattleArea = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <StyledArea>
        <Area />
      </StyledArea>
    </DndProvider>
  );
};
