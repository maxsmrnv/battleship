import React from 'react';
import { useDrag } from 'react-dnd';

import styled, { keyframes } from 'styled-components';

const shake = keyframes`
10%, 90% {
 transform: translate3d(-1px, 0, 0);
}

20%, 80% {
 transform: translate3d(2px, 0, 0);
}

30%, 50%, 70% {
 transform: translate3d(-4px, 0, 0);
}

40%, 60% {
 transform: translate3d(4px, 0, 0);
}
`;

const StyledShip = styled.div`
  position: absolute;
  background-color: black;
  cursor: move;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  width: ${(props) => 50 * props.width}px;
  height: ${(props) => 50 * props.height}px;

  animation: ${(props) => props.needShake && shake} 0.82s
    cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
`;

const Ship = ({
  id,
  hideSourceOnDrag,
  left,
  top,
  width,
  height,
  rotate,
  needShake,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      left,
      top,
      width,
      height,
      type: 'ship',
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleRotate = (e) => {
    e.preventDefault();
    rotate(id);
  };

  if (isDragging && hideSourceOnDrag) {
    return <StyledShip ref={drag} />;
  }
  return (
    <StyledShip
      needShake={needShake}
      left={left}
      top={top}
      width={width}
      height={height}
      ref={drag}
      onClick={handleRotate}
    />
  );
};

export default Ship;
