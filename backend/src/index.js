import Game from './game.js';
import Ship from './ship.js';
import Player from './player.js';
import WebSocketServer from 'ws';
import v4 from 'uuid';

let players = {};
let game = null;

let wsServer = new WebSocketServer.Server({
  port: 8081
});
wsServer.on('connection', ws => {
  ws.id = v4();
  players[ws.id] = {
    socket: ws,
    player: null
  };
  ws.onmessage = message => {
    let data = JSON.parse(message.data);
    if (data['ships']) {
      let player = new Player(data.ships.map(ship => new Ship(ship)));
      players[ws.id].player = player;
      if (Object.keys(players).length == 2) {
        game = new Game(
          players[Object.keys(players)[0]].player,
          players[Object.keys(players)[1]].player
        );
      }
    } else if (data['shoot']) {
      game.shoot({
        movieOvner: players[ws.id].player,
        coordinates: data.shoot.coordinates
      });
    }
  };
});
