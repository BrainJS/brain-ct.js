import highcharts from './highcharts';

export default class Translate {
  constructor() {
    this.brainCt = null;
    this.iterations = 1e5;
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

  highchartsSync(options) {
    const results = this.brainCt.scanSync(this.iterations);
    return highcharts(results, options);
  }
}
