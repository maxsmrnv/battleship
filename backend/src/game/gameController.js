import * as gameService from './gameService.js';

export const createGame = (req, res) => res
  .status(201)
  .json(gameService.createGame())
  .end();

export const addPlayerToGame = (req, res) => {
  const { gameId } = req.params;
  const { playerId } = req.body;
  const game = gameService.addPlayerToGame(gameId, playerId);
  res
    .json(game)
    .end();
};

export const shot = (req, res) => {
  const { playerId, gameId } = req.params;
  const { coordinates } = req.body;
  const result = gameService.shot(gameId, { playerId, coordinates });
  res
    .json(result)
    .end();
};

export const getGameInfoForPlayer = (req, res) => {
  const { gameId, playerId } = req.params;
  const gameInfo = gameService.getGameInfoForPlayer(gameId, playerId);
  res
    .json(gameInfo)
    .end();
};

export const getGameInfo = (req, res) => {
  const { gameId } = req.params;
  const gameInfo = gameService.getGameInfo(gameId);
  res
    .json(gameInfo)
    .end();
};
