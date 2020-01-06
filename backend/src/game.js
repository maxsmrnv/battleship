export default class Game {
  constructor(firstPlayer, secondPlayer) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.movieOvner = firstPlayer;
    this.waitedPlayer = secondPlayer;
  }

  shoot({ coordinates, movieOvner }) {
    if (this.movieOvner !== movieOvner) {
      return;
    }

    let result = this.waitedPlayer.shoot(coordinates);
    movieOvner.enemyField[coordinates] = result;
    return result;
  }
}
