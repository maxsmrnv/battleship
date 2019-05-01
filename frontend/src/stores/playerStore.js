import { observable, action } from 'mobx';

class PlayerStore {
  @observable name = sessionStorage.getItem('name');

  @action('name changed')
  setName(name) {
    sessionStorage.setItem('name', name);
    this.name = name;
  }
}

export default new PlayerStore();
