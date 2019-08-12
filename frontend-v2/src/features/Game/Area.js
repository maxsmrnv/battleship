import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Ship from './Ship';

const styles = {
  width: 500,
  height: 500,
  border: '1px solid grey',
  position: 'relative'
};
const Area = () => {
  const initShips = {
    // submarine0: { top: 0, left: 0, width: '1', height: '1' }
    // submarine1: { top: 0, left: 150, width: '1', height: '1' },
    // submarine2: { top: 0, left: 250, width: '1', height: '1' },
    // submarine3: { top: 100, left: 100, width: '1', height: '1' },
    // destroyer0: { top: 200, left: 50, width: '2', height: '1' }
    // destroyer1: { top: 200, left: 50, width: '2', height: '1' },
    // destroyer2: { top: 200, left: 50, width: '2', height: '1' },
    // cruiser0: { top: 250, left: 200, width: '1', height: '3' },
    cruiser1: { top: 0, left: 0, width: '1', height: '3' },
    battleship: { top: 250, left: 200, width: '4', height: '1' }
  };

  const [ships, setShips] = useState(initShips);

  const renderSquare = i => {
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
  };

  const alignTargetByGrid = (x, y) => [
    Math.round(x / 50) * 50,
    Math.round(y / 50) * 50
  ];

  const intersectRect = (r1, r2) => {
    return !(
      r2.left >= r1.right ||
      r2.right <= r1.left ||
      r2.top >= r1.bottom ||
      r2.bottom <= r1.top
    );
  };

  const [, drop] = useDrop({
    accept: 'ship',
    canDrop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      const [newLeft, newTop] = alignTargetByGrid(left, top);
      const areaConflictsIsExist = (val, factor) => {
        return val + factor * 50 > 500 || val < 0;
      };
      const shipsIntersect = Object.keys(ships)
        .map(key => {
          if (item.id !== key) {
            const { left, top, width, height } = ships[key];
            return {
              left,
              top,
              right: left + width * 50,
              bottom: top + height * 50
            };
          }
          return null;
        })
        .filter(el => el)
        .reduce((acc, next) => {
          const res = intersectRect(
            {
              left: newLeft - 50,
              top: newTop - 50,
              right: left + item.width * 50 + 50,
              bottom: top + item.height * 50 + 50
            },
            next
          );
          return acc || res;
        }, false);

      return !(
        areaConflictsIsExist(newLeft, item.width) ||
        areaConflictsIsExist(newTop, item.height) ||
        shipsIntersect
      );
    },
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      const [x, y] = alignTargetByGrid(left, top);
      moveBox(item.id, x, y);
      return undefined;
    }
  });

  const rotate = id => {
    const { width, height } = ships[id];
    setShips(ships => {
      return {
        ...ships,
        [id]: {
          ...ships[id],
          width: height,
          height: width
        }
      };
    });
  };

  const moveBox = (id, left, top) => {
    setShips(ships => {
      return {
        ...ships,
        [id]: { ...ships[id], left, top }
      };
    });
  };

  return (
    <div ref={drop} style={styles}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {[...Array(100).keys()].map(index => renderSquare(index))}
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
              rotate={rotate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Area;
