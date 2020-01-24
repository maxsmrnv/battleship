export default class Player {
  constructor(ships) {
    this.enemyField = Array(100);
    this.enemyShots = [];
    this.ships = ships;
  }

  shot(coordinates) {
    const damagedShip = this.ships.filter(
      (ship) => ship.liveDecs.indexOf(coordinates) > -1,
    );
    if (damagedShip[0]) {
      this.enemyShots.push({ coordinates, result: 'hit' });
      damagedShip[0].liveDecs = damagedShip[0].liveDecs.filter(
        (liveDec) => liveDec !== coordinates,
      );
      damagedShip[0].damagedDecs.push(coordinates);
      return damagedShip[0].liveDecs.length ? 'hit' : 'crushed';
    }
    this.enemyShots.push({ coordinates, result: 'miss' });
    return 'miss';
  }

  hasLiveShips() {
    return this.ships.filter((s) => s.liveDecs.length).length !== 0;
  }
}
