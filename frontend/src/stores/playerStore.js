import { observable } from 'mobx';

class PlayerStore {
  @observable name = '';
}

export default new PlayerStore();
