import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Area from './Area';

export const BattleArea = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Area />
    </DndProvider>
  );
};
