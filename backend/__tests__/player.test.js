import Player from '../src/player.js';
import Ship from '../src/ship.js';

let player;

beforeEach(() => {
  const ships = [new Ship([1, 2, 3])];
  player = new Player(ships);
});

test('Initialize player', () => {
  expect(player.getShips().length).toBe(1);
  expect(player.hasLiveShips()).toBeTruthy();
  expect(player.getEnemyField().length).toBe(100);
  expect(player.getEnemyShots().length).toBe(0);
});

test('Shot', () => {
  expect(player.shot(4)).toBe('miss');
  expect(player.shot(2)).toBe('hit');
  expect(player.shot(1)).toBe('hit');
  expect(player.shot(3)).toBe('crushed');
  expect(player.shot(3)).toBe('repeat');
});

test('Having live ships', () => {
  player.shot(2);
  player.shot(3);
  player.shot(1);

  expect(player.hasLiveShips()).toBeFalsy();
});
