import express from 'express';
import { createPlayer } from './player/playerController.js';
import * as gameController from './game/gameController.js';
import { addClient } from './client/clientController.js';

const routes = express.Router();

routes.post('/players', createPlayer);

routes.post('/games', gameController.createGame);
routes.patch('/games/:gameId/players', gameController.addPlayerToGame);
routes.patch('/games/:gameId/players/:playerId/shots', gameController.shot);
routes.get('/games/:gameId/players/:playerId', gameController.getGameInfoForPlayer);
routes.get('/games/:gameId', gameController.getGameInfo);

routes.get('/clients/:clientId', addClient);

export default routes;
