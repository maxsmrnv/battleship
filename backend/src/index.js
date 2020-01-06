import Game from './game.js';
import Ship from './ship.js';
import Player from './player.js';

let firstPlayer = new Player([new Ship([1])]);
let secondPlayer = new Player([new Ship([0, 1])]);

let game = new Game(firstPlayer, secondPlayer);
let result = game.shoot({ coordinates: 1, movieOvner: firstPlayer });
console.log(result);
