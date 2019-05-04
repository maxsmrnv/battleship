import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { inject } from 'mobx-react';

const Cell = styled.div`
  background-color: white;
  width: 50px;
  height: 50px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  display: grid;
  justify-content: center;
  align-content: center;
`;

const cellTarget = {
  drop(props) {
    console.log('props', props);
    props.battleStore.moveShip(props['data-cellIndex']);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function BoardCell({ connectDropTarget, isOver, children }) {
  return connectDropTarget(
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <Cell>{children}</Cell>
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'lightgreen'
          }}
        />
      )}
    </div>
  );
}

export default inject('battleStore')(
  DropTarget('ship', cellTarget, collect)(BoardCell)
);
