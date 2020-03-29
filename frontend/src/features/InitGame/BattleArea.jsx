import React from 'react';
import { useDrop } from 'react-dnd';
import { observer } from 'mobx-react';
import { useStores } from '../../utils';

import Ship from './Ship';

const styles = {
  width: 500,
  height: 500,
  border: '1px solid grey',
  position: 'relative',
};

export const BattleArea = observer(() => {
  const {
    shipsStore: { shipsPosition, changeShakeState, moveShip, rotateShip },
  } = useStores();

  const renderSquare = (i) => (
    <div
      key={i}
      style={{
        border: '1px dashed grey',
        backgroundColor: 'white',
        height: '48px',
        width: '48px',
        zIndex: 0,
      }}
    />
  );

  const alignTargetByGrid = (x, y) => [
    Math.round(x / 50) * 50,
    Math.round(y / 50) * 50,
  ];

  const intersectRect = (r1, r2) =>
    !(
      r2.left >= r1.right ||
      r2.right <= r1.left ||
      r2.top >= r1.bottom ||
      r2.bottom <= r1.top
    );

  const shipsIntersect = (ship) =>
    Object.keys(shipsPosition)
      .filter((key) => ship.id !== key)
      .map((key) => {
        const { left, top, width, height } = shipsPosition[key];
        return {
          left,
          top,
          right: left + width * 50,
          bottom: top + height * 50,
        };
      })
      .reduce((acc, next) => {
        const res = intersectRect(
          {
            left: ship.left - 50,
            top: ship.top - 50,
            right: ship.left + ship.width * 50 + 50,
            bottom: ship.top + ship.height * 50 + 50,
          },
          next
        );
        return acc || res;
      }, false);

  const areaConflictsIsExist = (val, factor) =>
    val + factor * 50 > 500 || val < 0;

  const [, drop] = useDrop({
    accept: 'ship',
    canDrop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      const [newLeft, newTop] = alignTargetByGrid(left, top);

      return !(
        areaConflictsIsExist(newLeft, item.width) ||
        areaConflictsIsExist(newTop, item.height) ||
        shipsIntersect({
          id: item.id,
          left: newLeft,
          top: newTop,
          width: item.width,
          height: item.height,
        })
      );
    },
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      const [x, y] = alignTargetByGrid(left, top);
      moveShip(item.id, x, y);
      return undefined;
    },
  });

  const rotate = (id) => {
    const { width, height } = shipsPosition[id];
    if (
      !shipsIntersect({
        ...shipsPosition[id],
        width: height,
        height: width,
        id,
      }) &&
      !areaConflictsIsExist(shipsPosition[id].top, width) &&
      !areaConflictsIsExist(shipsPosition[id].left, height)
    ) {
      rotateShip(id, height, width);
    } else {
      changeShakeState(id);
      setTimeout(() => changeShakeState(id), 500);
    }
  };

  return (
    <div ref={drop} style={styles}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {[...Array(100).keys()].map((index) => renderSquare(index))}
        {Object.keys(shipsPosition).map((key) => {
          const { left, top, width, height, needShake } = shipsPosition[key];
          return (
            <Ship
              needShake={needShake}
              key={key}
              id={key}
              left={left}
              top={top}
              width={width}
              height={height}
              hideSourceOnDrag
              rotate={rotate}
            />
          );
        })}
      </div>
    </div>
  );
});
