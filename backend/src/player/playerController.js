import * as playerService from './playerService.js';

export const createPlayer = (req, res) => {
  const { ships } = req.body;
  res.status(201)
    .json(playerService.createPlayer(ships))
    .end();
};
