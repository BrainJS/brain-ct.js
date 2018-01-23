'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (trainedNet, options) {
  data.input = trainedNet.outputs[0];
  data.output = trainedNet.outputs[trainedNet.outputs.length - 1];
  informAboutDependencies();
  return generateOptions(trainedNet, options);
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var data = {
  input: undefined,
  output: undefined
};

function informAboutDependencies() {
  console.log('Ensure you are including both Highcharts and the Draggable Points plugin, e.g. \n    <script src="https://code.highcharts.com/highcharts.js"></script>\n    <script src="https://rawgithub.com/highcharts/draggable-points/master/draggable-points.js"></script>\nYou can find more information Highcharts and this plugin at https://www.highcharts.com/');
}

function updateData(x, y, chart) {
  data.input[x] = y;
  data.output = net.run(data.input);
  chart.series[1].setData(data.output, true, false, true);
  chart.redraw();
}

function generateOptions(trainedNet, options) {
  return {
    chart: {
      animation: false
    },
    title: {
      text: 'Neural Net Explorer'
    },
    xAxis: [{ categories: data.input.map(function (s, i) {
        return 'Input ' + i;
      }) }, { categories: [].concat(_toConsumableArray(data.output)).map(function (s, i) {
        return 'Output ' + i;
      }) }],
    yAxis: {
      min: 0,
      max: 1
    },
    plotOptions: {
      series: {
        point: {
          events: {
            drag: function drag(e) {
              updateData(this.x, this.y, this.series.chart);
            },
            drop: function drop() {
              updateData(this.x, this.y, this.series.chart);
            }
          }
        },
        stickyTracking: false
      },
      line: {
        cursor: 'ns-resize'
      }
    },
    tooltip: {
      yDecimals: 2
    },
    series: [{
      data: [].concat(_toConsumableArray(data.input)),
      name: 'Inputs',
      draggableY: true,
      dragMinY: 0,
      dragMaxY: 1,
      dragPrecision: 0.01,
      type: 'column',
      minPointLength: 2,
      xAxis: 0
    }, {
      data: [].concat(_toConsumableArray(data.output)),
      type: options.outputType === 'point' ? 'point' : 'line',
      name: 'Outputs',
      draggableY: false,
      xAxis: 1
    }]
  };
}
//# sourceMappingURL=explorer.js.map