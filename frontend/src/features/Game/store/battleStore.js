import { observable, action } from 'mobx';

const URL = 'ws://localhost:8081';
class BattleStore {
  @observable messages = [];
  @observable ws;
  @observable wsIsAvailable = false;

  @observable enemyShips = [];
  @observable playerShips = [];
  @observable yourMove = false;

  @action
  createConnection = () => {
    const webSocketURL = `${URL}`;
    console.log('connection...');

    this.ws = new WebSocket(webSocketURL);
    this.ws.onopen = () => {
      this.wsIsAvailable = true;
    };

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data);

      this.enemyShips = message.state.enemyFiled;
      this.playerShips = message.state.ships;
      this.yourMove = message.state.movieOwner === 'you';
      console.log('new msg:', message);
    };

    this.ws.onclose = () => {
      this.wsIsAvailable = false;
      console.log('disconnected');

      // automatically try to reconnect on connection loss
      this.ws = new WebSocket(webSocketURL);
    };
  };

  @action
  sendMessage = message => {
    this.ws.readyState && this.ws.send(JSON.stringify(message));
  };
}

export const battleStore = new BattleStore();
