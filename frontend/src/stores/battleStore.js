import { observable, action } from 'mobx';

class battleStore {
  @observable battleUUID;

  @action async startBattle(playerName) {
    this.isFetching = true;
    this.error = null;
    try {
      const response = await axios.post('localhost:3001/battle', {
        name: playerName
      });
      this.battleUUID = response.data.battleUUID;
      this.isFetching = false;
    } catch (error) {
      this.error = error;
      this.isFetching = false;
    }
  }
}
export default new battleStore();
