import { observable, action, computed } from 'mobx';

class ChatStore {
  @observable messages = [
    { id: 1, name: 'max smirnov', message: 'vsem hi' },
    { id: 2, name: 'dan abramov', message: 'zdarov, klassno sdelal!' },
    { id: 2, name: 'kolya evstafev', message: 'кайфовый десигн!' }
  ];
}

export default new ChatStore();
