import React from 'react';
import { useDrag } from 'react-dnd';
import { StyledShip } from '../style';

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
