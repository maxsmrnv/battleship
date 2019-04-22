import { observable, action } from 'mobx';

class ChatStore {
  @observable messages = [
    { id: 1, name: 'max smirnov', message: 'vsem hi' },
    { id: 2, name: 'dan abramov', message: 'zdarov, klassno sdelal!' },
  ];
}

export default new ChatStore();
