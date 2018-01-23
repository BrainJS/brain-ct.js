import highcharts from './highcharts/';

export default class Translate {
  constructor() {
    this.brainCt = null;
  }
  static get from() {
    const translate = new Translate();
    return translate.from = translate.from.bind(translate);
  }

  from(brainCt) {
    this.brainCt = brainCt;
    return this;
  }

  get to() {
    return this;
  }

  get highcharts() {
    return new highcharts(this.brainCt);
  }
}
