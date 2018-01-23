'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (results, options) {
  informAboutDependencies();
  return generateOptions(results, options);
};

function informAboutDependencies() {
  console.log('For Brain-CT Scanner, ensure you are including Highcharts and, for better performance, the boost module, e.g. \n    <script src="https://code.highcharts.com/highcharts.js"></script>\n    <script src="https://code.highcharts.com/modules/boost-canvas.js"></script>\n    <script src="https://code.highcharts.com/modules/boost.js"></script>\nYou can find more information Highcharts and this module at https://www.highcharts.com/');
}

function generateOptions(data, options) {
  return {
    title: { text: 'Neural Net CT Scan' },
    boost: {
      useGPUTranslations: true,
      enabled: true
    },
    chart: {
      width: 1000,
      height: 750,
      type: 'scatter'
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    xAxis: {
      title: { text: 'Output' },
      min: 0,
      max: data[0].outputs.length,
      tickInterval: 1,
      gridLineWidth: 1
    },
    yAxis: {
      title: { text: 'Input' },
      min: 0,
      max: data[0].inputs.length,
      tickInterval: 1,
      gridLineWidth: 1
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top'
    },
    tooltip: {
      pointFormatter: function pointFormatter() {
        return '<b>Output:</b> ' + this.x % 1 + '<br /><b>Input:</b> ' + this.y % 1;
      }
    },
    series: outputData(data)
  };
}

function coerceAllToNearest(array, options) {
  options = options || {};
  if (!options.toNearest) return array;
  var multiplier = 1 / options.toNearest;
  return array.map(function (c) {
    return Math.round(c * multiplier) / multiplier;
  });
}

function outputData(results, options) {
  /**
   * results = [{ inputs: [], outputs: []}]
   * @type {Array}
   */
  options = options || {};

  return results[0].outputs.map(function (o, oIndex) {
    return {
      id: 'output' + oIndex,
      name: 'All Output ' + oIndex,
      showInLegend: true
    };
  }).concat(results.reduce(function (agg, result) {
    result.inputs.forEach(function (input, inputNumber) {
      result.outputs.forEach(function (output, outputNumber) {
        var aggIndex = inputNumber + outputNumber * result.inputs.length;
        agg[aggIndex] = agg[aggIndex] || {
          linkedTo: 'output' + outputNumber,
          showInLegend: true,
          name: 'Output ' + outputNumber + ' - Input ' + inputNumber,
          data: [],
          type: 'scatter',
          boostThreshold: 1,
          marker: {
            radius: 0.3
          }
        };
        var x = output + outputNumber;
        var y = input + inputNumber;
        agg[aggIndex].data.push([x, y]);
      });
    });
    return agg;
  }, []));
}
//# sourceMappingURL=scanner.js.map