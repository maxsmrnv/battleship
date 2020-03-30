export default class Ship {
  constructor(liveDecs) {
    this.liveDecs = [...liveDecs];
    this.damagedDecs = [];
  }

  getLiveDecs() {
    return this.liveDecs;
  }

  getDamagedDecs() {
    return this.damagedDecs;
  }
}
