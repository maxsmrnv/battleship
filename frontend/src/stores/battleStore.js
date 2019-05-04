import { observable, action } from 'mobx';
import axios from 'axios';

class battleStore {
  @observable gameUUID;

  @observable battleFlowStatus = 'pendingForPlayer'; // pendingForPlayer -> preparation -> battle -> results

  @observable shipsPosition = 0;

  @action moveShip(index) {
    this.shipsPosition = index;
  }

  @action async startBattle(playerName) {
    this.isFetching = true;
    this.error = null;
    try {
      const response = await axios.post('http://localhost:3001/game', {
        name: playerName
      });
      this.gameUUID = response.data.gameUUID;
      this.isFetching = false;
    } catch (error) {
      this.error = error;
      this.isFetching = false;
    }
  }
}
export default new battleStore();
