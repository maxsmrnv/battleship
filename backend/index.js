import WebSocketServer from 'ws';
import v4 from 'uuid';
import Game from './src/game.js';
import Ship from './src/ship.js';
import Player from './src/player.js';

const players = {};
let game = null;

const wsServer = new WebSocketServer.Server({
  port: 8081,
});
wsServer.on('connection', (ws) => {
  ws.id = v4();
  players[ws.id] = {
    socket: ws,
    player: null,
  };
  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.ships) {
      const player = new Player(data.ships.map((ship) => new Ship(ship)));
      players[ws.id].player = player;
      player.id = ws.id;
      joinWaitingRoom();
    } else if (typeof data.shot !== 'undefined') {
      const shot = {
        movieOwner: players[ws.id].player,
        coordinates: data.shot,
      };

      if (game.isValidShot(shot)) {
        const movieResult = game.shot(shot);
        sendGameStateById(game.movieOwner.id, movieResult);
        sendGameStateById(game.waitedPlayer.id, movieResult);
      }
    }
  };
});

function sendGameStateById(id, movieResult) {
  const { player, socket } = players[id];
  socket.send(
    JSON.stringify({
      state: {
        movieOwner: game.movieOwner.id === id ? 'you' : 'opponent',
        ships: player.enemyShots.reduce((acc, next) => {
          acc[next.coordinates] = next.result;
          return acc;
        }, player.ships.reduce((acc, next) => {
          next.liveDecs.forEach((dec) => { acc[dec] = 'ship'; });
          next.damagedDecs.forEach((dec) => { acc[dec] = 'hit'; });
          return acc;
        }, [...Array(100).keys()].map(() => null))),
        enemyFiled: player.enemyField,
        movieResult,
        gameStatus: game.status,
      },
    }),
  );
}

function joinWaitingRoom() {
  const joinedPlayers = Object.keys(players)
    .map((id) => players[id])
    .filter((p) => p.player !== null);
  if (joinedPlayers.length === 2) {
    game = new Game(joinedPlayers[0].player, joinedPlayers[1].player);
    sendGameStateById(game.movieOwner.id);
    sendGameStateById(game.waitedPlayer.id);
  }
}
