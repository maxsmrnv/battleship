import React from 'react';
import { DragSource } from 'react-dnd';
import styled from 'styled-components';

const StyledShip = styled.div`
  width: 50px;
  height: 50px;
  background-color: black;
`;

const shipSource = {
  beginDrag(props) {
    console.log('begin', props);
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function Ship({ connectDragSource, isDragging }) {
  return connectDragSource(
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}
    >
      <StyledShip />
    </div>
  );
}

export default DragSource('ship', shipSource, collect)(Ship);
