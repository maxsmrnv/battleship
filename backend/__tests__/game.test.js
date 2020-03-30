import Game from '../src/game/game.js';
import Player from '../src/player.js';
import Ship from '../src/ship.js';

let game;

beforeEach(() => {
  const firstPlayer = new Player([new Ship([1, 2, 3])]);
  const secondPlayer = new Player([new Ship([1, 2, 3])]);
  game = new Game(firstPlayer, secondPlayer);
});

test('Initial game state', () => {
  expect(game.getStatus()).toBe('inprogress');
});
