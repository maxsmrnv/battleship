import { observable, action } from 'mobx';

const URL = 'ws://localhost:8081';
class BattleStore {
  @observable messages = [];
  @observable ws;
  @observable wsIsAvailable = false;

  @action
  createConnection = () => {
    const webSocketURL = `${URL}`;
    console.log('connection...');

    this.ws = new WebSocket(webSocketURL);
    this.ws.onopen = () => {
      setTimeout(() => {
        console.log('connected');

        this.wsIsAvailable = true;
      }, 1000);

      // on connecting, do nothing but log it to the console
    };

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      console.log('message', message);
      //      if (message.type === 'message') {
      // this.messages.push({
      //   name: message.author,
      //   message: message.text
      // });
      //      }
      console.log('new msg:', message);
    };

    this.ws.onclose = () => {
      this.wsIsAvailable = false;

      console.log('disconnected');
      //      this.ws = new WebSocket(webSocketURL);
      // automatically try to reconnect on connection loss
    };
  };

  @action
  sendMessage = message => {
    console.log('readyState', this.ws.readyState);
    this.ws.readyState && this.ws.send(message);
  };
}

export const battleStore = new BattleStore();
