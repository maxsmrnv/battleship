export default class Game {
  constructor(firstPlayer, secondPlayer) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.movieOwner = firstPlayer;
    this.waitedPlayer = secondPlayer;
    this.status = 'inprogress';
  }

  shot({ coordinates, movieOwner }) {
    const result = this.waitedPlayer.shot(coordinates);
    this.movieOwner.enemyField[coordinates] = result === 'crushed' ? 'hit' : result;
    if (!this.waitedPlayer.hasLiveShips()) {
      this.status = 'gameover';
    } else if (result === 'miss') {
      this.movieOwner = this.waitedPlayer;
      this.waitedPlayer = movieOwner;
    }
    return result;
  }

  isValidShot({ coordinates, movieOwner }) {
    if (this.movieOwner !== movieOwner
       || this.status !== 'inprogress'
        || this.waitedPlayer.enemyShots.filter((shot) => shot.coordinates === coordinates).length) {
      return false;
    }
    return true;
  }
}
