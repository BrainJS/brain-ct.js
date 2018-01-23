import scanner from './scanner';
import explorer from './explorer';

export default class highcharts {
  constructor (_brainct){
    this.brainCT = _brainct;
  }
  static get defaultOptions() {
    return {
      explorer: {
        outputType: 'line',
      },
      scanner: {
        iterations: 1e5,
      }
    }
  }

  explorer(_options) {
    const options = {...highcharts.defaultOptions.explorer, ..._options};
    return explorer(this.brainCT.net, options);
  }
  scannerSync(_options) {
    const options = {...highcharts.defaultOptions.scanner, ..._options};
    const results = this.brainCT.scanSync(options.iterations);
    return scanner(results, options);
  }
}