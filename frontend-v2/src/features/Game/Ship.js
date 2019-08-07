import React from 'react';
import { DragSource } from 'react-dnd';

import styled from 'styled-components';

const StyledShip = styled.div`
  position: absolute;
  background-color: black;
  cursor: move;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  width: ${props => 50 * props.width}px;
  height: ${props => 50 * props.height}px;
`;

const Ship = ({
  hideSourceOnDrag,
  left,
  top,
  width,
  height,
  connectDragSource,
  isDragging
}) => {
  if (isDragging && hideSourceOnDrag) {
    return null;
  }
  return (
    <StyledShip
      left={left}
      top={top}
      width={width}
      height={height}
      ref={ship => connectDragSource(ship)}
    />
  );
};
export default DragSource(
  'ship',
  {
    beginDrag(props) {
      const { id, left, top, width, height } = props;
      return { id, left, top, width, height };
    },
    endDrag(props) {
      console.log('kek', props);
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Ship);
