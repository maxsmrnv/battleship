import { observable, action } from 'mobx';

const URL = 'ws://localhost:8081';
class BattleStore {
  @observable messages = [];
  @observable ws;

  @action
  createConnection = () => {
    console.log('here');
    const webSocketURL = `${URL}`;

    this.ws = new WebSocket(webSocketURL);
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected');
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
      console.log('disconnected');
      //      this.ws = new WebSocket(webSocketURL);
      // automatically try to reconnect on connection loss
    };
  };

  @action
  sendMessage = message => {
    this.ws.send(message);
  };
}

export const battleStore = new BattleStore();
