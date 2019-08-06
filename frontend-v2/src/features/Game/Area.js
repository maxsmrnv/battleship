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
        a: { top: 0, left: 100, width: '50px' },
        b: { top: 200, left: 50, width: '100px' },
        c: { top: 250, left: 200, width: '150px' }
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
            const { left, top, width } = ships[key];
            return (
              <Ship
                key={key}
                id={key}
                left={left}
                top={top}
                width={width}
                hideSourceOnDrag={true}
              />
            );
          })}
        </div>
      </div>
    );
  }
  moveBox(id, left, top, width) {
    this.setState(state => {
      return {
        ships: { ...state.ships, [id]: { ...state.ships[id], left, top } }
      };
    });
  }
}
export default DropTarget(
  'ship',
  {
    drop(props, monitor, component) {
      if (!component) {
        return;
      }
      const { id, left, top } = monitor.getItem();

      const delta = monitor.getDifferenceFromInitialOffset();
      const newLeft = Math.round(left + delta.x);
      const newTop = Math.round(top + delta.y);
      component.moveBox(id, newLeft, newTop);
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(Area);
