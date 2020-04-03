export default class Player {
  constructor(id, ships = []) {
    this.id = id;
    this.enemyField = [];
    this.enemyShots = [];
    this.ships = ships;
  }

  shot(coordinates) {
    if (this.enemyShots.some((shot) => shot.coordinates === coordinates)) {
      return 'repeat';
    }
    const damagedShip = this.ships.find(
      (ship) => ship.liveDecs.indexOf(coordinates) > -1,
    );
    if (damagedShip) {
      this.enemyShots.push({ coordinates, result: 'hit' });
      damagedShip.liveDecs = damagedShip.liveDecs.filter(
        (liveDec) => liveDec !== coordinates,
      );
      damagedShip.damagedDecs.push(coordinates);
      return damagedShip.liveDecs.length ? 'hit' : 'crushed';
    }
    this.enemyShots.push({ coordinates, result: 'miss' });
    return 'miss';
  }

  getEnemyField() {
    return this.enemyField;
  }

  getEnemyShots() {
    return this.enemyShots;
  }

  getShips() {
    return this.ships;
  }

  hasLiveShips() {
    return this.ships.some((s) => s.liveDecs.length > 0);
  }
}
