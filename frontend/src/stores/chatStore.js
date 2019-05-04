import { observable, action, computed } from 'mobx';

const URL = 'ws://localhost:1337/chat';

class ChatStore {
  @observable messages = [];
  @observable ws;

  @action
  createConnection(user) {
    this.ws = new WebSocket(URL + `/${user.userName}`);
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected');
      this.ws.send(user.userName);
      // this.ws.send(JSON.stringify(user));
    };

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      // this.messages.push(message.data);
      if (message.type === 'message') {
        this.messages.push({
          name: message.data.author,
          message: message.data.text
        });
      }
      console.log('new msg:', message);
    };

    this.ws.onclose = () => {
      console.log('disconnected');
      this.ws = new WebSocket(URL);
      // automatically try to reconnect on connection loss
    };
  }

  @action
  sendMessage(message) {
    this.ws.send(message);
  }
}

export default new ChatStore();
