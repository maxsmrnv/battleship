import { observable, action, computed } from 'mobx';

class ShipsStore {
  @observable
  shipsPosition = {
    submarine0: {
      top: 50,
      left: 0,
      width: '1',
      height: '1',
    },
    submarine1: {
      top: 400,
      left: 300,
      width: '1',
      height: '1',
    },
    submarine2: {
      top: 50,
      left: 250,
      width: '1',
      height: '1',
    },
    submarine3: {
      top: 150,
      left: 100,
      width: '1',
      height: '1',
    },
    destroyer0: {
      top: 0,
      left: 400,
      width: '1',
      height: '2',
    },
    destroyer1: {
      top: 450,
      left: 50,
      width: '2',
      height: '1',
    },
    destroyer2: {
      top: 150,
      left: 350,
      width: '2',
      height: '1',
    },
    cruiser0: {
      top: 300,
      left: 450,
      width: '1',
      height: '3',
    },
    cruiser1: {
      top: 200,
      left: 0,
      width: '1',
      height: '3',
    },
    battleship: {
      top: 250,
      left: 200,
      width: '4',
      height: '1',
    },
  };

  @observable
  isPrivate = false;

  @action
  setIsPrivate = () => {
    this.isPrivate = !this.isPrivate;
  };

  @action
  setShipsPosition = (ships) => {
    this.shipsPosition = ships;
  };

  @action
  changeShakeState = (id) =>
    this.setShipsPosition({
      ...this.shipsPosition,
      [id]: {
        ...this.shipsPosition[id],
        needShake: !this.shipsPosition[id].needShake,
      },
    });

  @action
  moveShip = (id, left, top) => {
    this.setShipsPosition({
      ...this.shipsPosition,
      [id]: { ...this.shipsPosition[id], left, top },
    });
  };

  @action
  rotateShip = (id, height, width) => {
    this.setShipsPosition({
      ...this.shipsPosition,
      [id]: {
        ...this.shipsPosition[id],
        width: height,
        height: width,
      },
    });
  };

  @computed
  get transformToGameView() {
    return Object.keys(this.shipsPosition).reduce((acc, next) => {
      const ship = this.shipsPosition[next];

      const start = ship.top / 5 + ship.left / 50;

      const widthRange = () =>
        Array(+ship.width)
          .fill()
          .map((_, i) => start + i);

      const heightRange = () =>
        Array(+ship.height)
          .fill()
          .map((_, i) => start + i * 10);

      const shipIndexes = +ship.width > 1 ? widthRange() : heightRange();

      return [...acc, shipIndexes];
    }, []);
  }
}

export const shipsStore = new ShipsStore();
