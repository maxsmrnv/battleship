import v4 from 'uuid';
import Player from './Player.js';
import Ship from '../Ship.js';
import { getId } from '../helpers.js';

const players = {};

export const createPlayer = (ships = []) => {
  const id = getId();
  const newPlayer = {
    player: new Player(id, ships.map((ship) => new Ship(ship))),
    game: null,
  };
  players[id] = newPlayer;
  return newPlayer;
};

export const getPlayerById = (id) => {
  if (!players[id]) {
    throw new Error('Player not found');
  }
  return players[id];
};

export const setPlayerGame = (playerId, gameId) => {
  const player = getPlayerById(playerId);
  if (player.game) {
    throw new Error('Player already in game');
  }
  player.game = gameId;
  return player;
};
