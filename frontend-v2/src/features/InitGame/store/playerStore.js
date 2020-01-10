import { observable, action } from 'mobx';

class PlayerStore {
  @observable
  playerName = '';

  @action
  setName = name => {
    this.playerName = name;
  };
}

export const playerStore = new PlayerStore();
