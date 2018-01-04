export default class ValuesInput {
  constructor(values) {
    this.values = values;
  }

  value() {
    return this.values[Math.floor(Math.random() * this.values.length)];
  }
}