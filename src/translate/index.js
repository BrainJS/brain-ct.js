import highcharts from './highcharts';

export class Translate {
  constructor(net = null) {
    this.net = net;
  }

  from(net) {
    this.net = net;
    return this;
  }

  get to() {
    return this;
  }

  highchartsSync() {
    return highcharts(this.net);
  }
}
