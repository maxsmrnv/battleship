import { observable, action } from 'mobx';
import axios from 'axios';

class BattleStore {
  @observable
  gameUUID = '';

  @observable
  gameIsLoading = false;

  @action
  setGameIsLoading = val => {
    this.gameIsLoading = val;
  };

  @action
  setGameUUID = session => {
    this.gameUUID = session;
  };

  @action
  startBattle = async () => {
    this.setGameIsLoading(true);
    try {
      const { session } = await axios.post('http://localhost:8080/initgame');
      this.setGameUUID(session);
      return session;
    } catch (error) {
      console.error(error);
    } finally {
      this.setGameIsLoading(false);
    }
  };
}

export const battleStore = new BattleStore();
