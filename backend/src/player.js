export default class Player {
  constructor(ships) {
    this.enemyField = Array(100);
    this.ships = ships;
  }

  shot(coordinates) {
    let damagedShip = this.ships.filter(
      ship => ship.liveDecs.indexOf(coordinates) > -1
    );
    if (damagedShip[0]) {
      damagedShip[0].liveDecs = damagedShip[0].liveDecs.filter(
        liveDec => liveDec !== coordinates
      );
      damagedShip[0].damagedDecs.push(coordinates);
      return damagedShip[0].liveDecs.length ? 'hit' : 'crushed';
    } else {
      return 'miss';
    }
  }

  hasLiveShips() {
    return (
      this.ships.filter(s => {
        return s.liveDecs.length;
      }).length !== 0
    );
  }
}
