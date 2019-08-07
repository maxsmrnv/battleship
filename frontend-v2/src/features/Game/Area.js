import React from 'react';
import { DropTarget } from 'react-dnd';
import Ship from './Ship';

const styles = {
  width: 500,
  height: 500,
  border: '1px solid grey',
  position: 'relative'
};
class Area extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      ships: {
        // submarine0: { top: 0, left: 0, width: '1', height: '1' }
        // submarine1: { top: 0, left: 150, width: '1', height: '1' },
        // submarine2: { top: 0, left: 250, width: '1', height: '1' },
        // submarine3: { top: 100, left: 100, width: '1', height: '1' },
        destroyer0: { top: 200, left: 50, width: '2', height: '1' }
        // destroyer1: { top: 200, left: 50, width: '2', height: '1' },
        // destroyer2: { top: 200, left: 50, width: '2', height: '1' },
        // cruiser0: { top: 250, left: 200, width: '1', height: '3' },
        // cruiser1: { top: 250, left: 200, width: '1', height: '3' },
        // battleship: { top: 250, left: 200, width: '4', height: '1' }
      }
    };
  }

  renderSquare(i) {
    return (
      <div
        key={i}
        style={{
          border: '1px dashed grey',
          backgroundColor: 'white',
          height: '48px',
          width: '48px',
          zIndex: 0
        }}
      />
    );
  }

  moveBox(id, left, top) {
    this.setState(state => {
      return {
        ships: { ...state.ships, [id]: { ...state.ships[id], left, top } }
      };
    });
  }

  render() {
    const { connectDropTarget } = this.props;
    const { ships } = this.state;
    return connectDropTarget(
      <div style={styles}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {[...Array(100).keys()].map(index => this.renderSquare(index))}{' '}
          {Object.keys(ships).map(key => {
            const { left, top, width, height } = ships[key];
            return (
              <Ship
                key={key}
                id={key}
                left={left}
                top={top}
                width={width}
                height={height}
                hideSourceOnDrag={true}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const alignTargetByGrid = (x, y) => [
  Math.round(x / 50) * 50,
  Math.round(y / 50) * 50
];

export default DropTarget(
  'ship',
  {
    hover(props, monitor, component) {
      console.log('canDrop', monitor.getItem());
    },
    drop(props, monitor, component) {
      if (!component) {
        return;
      }
      const { id, left, top, width, height } = monitor.getItem();
      const delta = monitor.getDifferenceFromInitialOffset();
      const newLeft = Math.round(left + delta.x);
      const newTop = Math.round(top + delta.y);
      const [x, y] = alignTargetByGrid(newLeft, newTop);
      component.moveBox(id, x, y);
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(Area);
