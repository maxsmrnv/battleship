import Game from './game.js';
import Ship from './ship.js';
import Player from './player.js';
import WebSocketServer from 'ws';
import v4 from 'uuid';

const players = {};
let game = null;

const wsServer = new WebSocketServer.Server({
  port: 8081
});
wsServer.on('connection', ws => {
  ws.id = v4();
  players[ws.id] = {
    socket: ws,
    player: null
  };
  ws.onmessage = message => {
    const data = JSON.parse(message.data);
    if (data.ships) {
      const player = new Player(data.ships.map(ship => new Ship(ship)));
      players[ws.id].player = player;
      player.id = ws.id;
      joinWaitingRoom();
    } else if (typeof data.shot !== 'undefined') {
      const movieResult = game.shot({
        movieOwner: players[ws.id].player,
        coordinates: data.shot
      });

      sendGameStateById(game.movieOwner.id, movieResult);
      sendGameStateById(game.waitedPlayer.id, movieResult);
    }
  };
});

function sendGameStateById(id, movieResult) {
  const { player, socket } = players[id];
  socket.send(
    JSON.stringify({
      state: {
        movieOwner: game.movieOwner.id === id ? 'you' : 'opponent',
        ships: player.ships,
        enemyFiled: player.enemyField,
        enemyShots: player.enemyShots,
        movieResult: movieResult,
        gameStatus: game.status
      }
    })
  );
}

function joinWaitingRoom() {
  const joinedPlayers = Object.keys(players)
    .map(id => {
      return players[id];
    })
    .filter(p => p.player !== null);
  if (joinedPlayers.length === 2) {
    game = new Game(joinedPlayers[0].player, joinedPlayers[1].player);
    sendGameStateById(game.movieOwner.id);
    sendGameStateById(game.waitedPlayer.id);
  }
}