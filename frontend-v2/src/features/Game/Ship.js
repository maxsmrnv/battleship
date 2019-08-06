import React from 'react';
import { DragSource } from 'react-dnd';

const style = {
  position: 'absolute',
  backgroundColor: 'black',
  cursor: 'move',
  height: '50px'
};
const Ship = ({
  hideSourceOnDrag,
  left,
  top,
  width,
  connectDragSource,
  isDragging
}) => {
  if (isDragging && hideSourceOnDrag) {
    return null;
  }
  return connectDragSource(
    <div style={{ ...style, left, top, width: width }} />
  );
};
export default DragSource(
  'ship',
  {
    beginDrag(props) {
      const { id, left, top } = props;
      return { id, left, top };
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Ship);
