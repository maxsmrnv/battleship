import React from 'react';
import { useDrag } from 'react-dnd';

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

const Ship = ({ id, hideSourceOnDrag, left, top, width, height }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, width, height, type: 'ship' },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  if (isDragging && hideSourceOnDrag) {
    return <StyledShip ref={drag} />;
  }
  return (
    <StyledShip
      left={left}
      top={top}
      width={width}
      height={height}
      ref={drag}
    />
  );
};

export default Ship;
