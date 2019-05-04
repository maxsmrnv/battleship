import React from 'react';
import styled from 'styled-components';
import BoardCell from './BoardCell';
import { inject, observer } from 'mobx-react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Ship from './Ship';

const Piece = ({ isShip, curPosition }) =>
  isShip ? <Ship curPosition={curPosition} /> : null;

const Area = styled.div`
  border-left: 1px solid black;
  border-top: 1px solid black;
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-template-rows: repeat(10, auto);
  justify-content: start;
  width: fit-content;
  height: fit-content;
`;

const renderCell = (shipPostions, curPosition) => {
  return (
    <BoardCell data-cellIndex={curPosition} key={curPosition}>
      <Piece curPosition={curPosition} isShip={shipPostions === curPosition} />
    </BoardCell>
  );
};

@inject('battleStore')
@observer
export default class Board extends React.Component {
  render() {
    const { shipsPosition } = this.props.battleStore;
    return (
      <>
        <DragDropContextProvider backend={HTML5Backend}>
          <Area>
            {[...Array(100).keys()].map(curPosition =>
              renderCell(shipsPosition, curPosition)
            )}
          </Area>
        </DragDropContextProvider>
      </>
    );
  }
}
