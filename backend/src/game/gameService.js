import v4 from 'uuid';
import Game from './Game.js';
import * as playerService from '../player/playerService.js';
import { getId } from '../helpers.js';
import * as clientService from '../client/clientService.js';

const games = {};


export const getGameById = (id) => {
  if (!games[id]) {
    throw new Error('Game not found');
  }
  return games[id];
};

export const addPlayerToGame = (gameId, playerId) => {
  const game = getGameById(gameId);
  const { player } = playerService.setPlayerGame(playerId, gameId);
  game.addPlayer(player);
  clientService.sendDataToClient(playerId, 'You added to game');
  return game;
};

export const createGame = () => {
  const id = getId();
  const newGame = new Game(id);
  games[id] = newGame;
  return newGame;
};

export const getGameInfo = (gameId) => {
  const game = getGameById(gameId);
  return {
    status: game.getStatus(),
    firstPlayer: game.getFirstPlayer().id,
    secondPlayer: game.getSecondPlayer().id,
  };
};

export const getGameInfoForPlayer = (gameId, playerId) => {
  const game = getGameById(gameId);
  const { player } = playerService.getPlayerById(playerId);
  return {
    state: {
      movieOwner: game.getMovieOwner().id === playerId ? 'you' : 'opponent',
      ships: player.getEnemyShots().reduce((acc, next) => {
        acc[next.coordinates] = next.result;
        return acc;
      }, player.getShips().reduce((acc, next) => {
        next.liveDecs.forEach((dec) => { acc[dec] = 'ship'; });
        next.damagedDecs.forEach((dec) => { acc[dec] = 'hit'; });
        return acc;
      }, [...Array(100).keys()].map(() => null))),
      enemyFiled: player.enemyField,
      gameStatus: game.getStatus(),
    },
  };
};

export const shot = (gameId, { coordinates, playerId }) => {
  const game = getGameById(gameId);
  const player = playerService.getPlayerById(playerId);
  if (gameId !== player.game) {
    throw new Error('Player from another game');
  }
  const waitedPlayer = game.getWaitedPlayer();
  const shotResult = game.shot({ coordinates, movieOwner: player.player });
  clientService.sendDataToClient(waitedPlayer.id, getGameInfoForPlayer(gameId, playerId));
  return { coordinates, shotResult };
};
