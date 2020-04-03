export default class Game {
  constructor(id) {
    this.id = id;
    this.status = 'pending';
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

  addPlayer(player) {
    if (!this.firstPlayer) {
      this.firstPlayer = player;
      this.movieOwner = player;
      return;
    }
    if (!this.secondPlayer) {
      this.secondPlayer = player;
      this.waitedPlayer = player;
      this.status = 'inprogress';
    }
  }
}
