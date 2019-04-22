import { observable, action } from 'mobx';


class PlayerStore {
  @observable name = '';

  @action('name changed')
  setName(name) {
    this.name = name;
  }
}

export default new PlayerStore();
