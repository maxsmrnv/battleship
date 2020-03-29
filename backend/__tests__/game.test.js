import Game from '../src/game';
import Player from '../src/player';
import Ship from '../src/ship';

let game;

beforeEach(() => {
  const firstPlayer = new Player([new Ship([1, 2, 3])]);
  const secondPlayer = new Player([new Ship([1, 2, 3])]);
  game = new Game(firstPlayer, secondPlayer);
});

test('Initial game state', () => {
  expect(game.getStatus()).toBe('inprogress');
});
