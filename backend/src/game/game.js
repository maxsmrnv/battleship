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
    this.movieOwner.getEnemyField()[coordinates] = result === 'crushed' ? 'hit' : result;
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
        || this.waitedPlayer.getEnemyShots().some((shot) => shot.coordinates === coordinates)) {
      return false;
    }
    return true;
  }

  getMovieOwner() {
    return this.movieOwner;
  }

  getWaitedPlayer() {
    return this.waitedPlayer;
  }

  getFirstPlayer() {
    return this.firstPlayer;
  }

  getSecondPlayer() {
    return this.secondPlayer;
  }

  getStatus() {
    return this.status;
  }
}
