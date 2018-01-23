(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomInput = require('./random-input');

var _randomInput2 = _interopRequireDefault(_randomInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrainCT = function () {
  function BrainCT(net, inputGenerators) {
    _classCallCheck(this, BrainCT);

    this.net = net;
    this.inputGenerators = inputGenerators || this.randomInputGenerators();
  }

  _createClass(BrainCT, [{
    key: 'randomInputGenerators',
    value: function randomInputGenerators() {
      var inputGenerators = [];
      for (var i = 0; i < this.net.sizes[0]; i++) {
        inputGenerators.push(new _randomInput2.default());
      }
      return inputGenerators;
    }
  }, {
    key: 'scanSync',
    value: function scanSync(iterations) {
      var results = [];
      for (var i = 0; i < iterations; i++) {
        var inputs = this.inputGenerators.map(function (iG) {
          return iG.value();
        });
        var outputs = Array.prototype.slice.call(this.net.run(inputs));
        results.push({
          inputs: inputs,
          outputs: outputs
        });
      }

      return results;
    }
  }]);

  return BrainCT;
}();

exports.default = BrainCT;

},{"./random-input":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _brainCt = require('./brain-ct');

var _brainCt2 = _interopRequireDefault(_brainCt);

var _randomInput = require('./random-input');

var _randomInput2 = _interopRequireDefault(_randomInput);

var _translate = require('./translate');

var _translate2 = _interopRequireDefault(_translate);

var _valuesInput = require('./values-input');

var _valuesInput2 = _interopRequireDefault(_valuesInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var brainCT = {
  BrainCT: _brainCt2.default,
  RandomInput: _randomInput2.default,
  Translate: _translate2.default,
  ValuesInput: _valuesInput2.default
};

exports.default = brainCT;


if (typeof window !== 'undefined') {
  window.brainCT = brainCT;
}

},{"./brain-ct":1,"./random-input":3,"./translate":7,"./values-input":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RandomInput = function () {
  function RandomInput() {
    _classCallCheck(this, RandomInput);
  }

  _createClass(RandomInput, [{
    key: "value",
    value: function value() {
      return Math.random();
    }
  }]);

  return RandomInput;
}();

exports.default = RandomInput;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scanner = require('./scanner');

var _scanner2 = _interopRequireDefault(_scanner);

var _explorer2 = require('./explorer');

var _explorer3 = _interopRequireDefault(_explorer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var highcharts = function () {
  function highcharts(_brainct) {
    _classCallCheck(this, highcharts);

    this.brainCT = _brainct;
  }

  _createClass(highcharts, [{
    key: 'explorer',
    value: function explorer(_options) {
      var options = _extends({}, highcharts.defaultOptions.explorer, _options);
      return (0, _explorer3.default)(this.brainCT.net, options);
    }
  }, {
    key: 'scannerSync',
    value: function scannerSync(_options) {
      var options = _extends({}, highcharts.defaultOptions.scanner, _options);
      var results = this.brainCT.scanSync(options.iterations);
      return (0, _scanner2.default)(results, options);
    }
  }], [{
    key: 'defaultOptions',
    get: function get() {
      return {
        explorer: {
          outputType: 'line'
        },
        scanner: {
          iterations: 1e5
        }
      };
    }
  }]);

  return highcharts;
}();

exports.default = highcharts;

},{"./explorer":4,"./scanner":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _highcharts = require('./highcharts/');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Translate = function () {
  function Translate() {
    _classCallCheck(this, Translate);

    this.brainCt = null;
  }

  _createClass(Translate, [{
    key: 'from',
    value: function from(brainCt) {
      this.brainCt = brainCt;
      return this;
    }
  }, {
    key: 'to',
    get: function get() {
      return this;
    }
  }, {
    key: 'highcharts',
    get: function get() {
      return new _highcharts2.default(this.brainCt);
    }
  }], [{
    key: 'from',
    get: function get() {
      var translate = new Translate();
      return translate.from = translate.from.bind(translate);
    }
  }]);

  return Translate;
}();

exports.default = Translate;

},{"./highcharts/":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValuesInput = function () {
  function ValuesInput(values) {
    _classCallCheck(this, ValuesInput);

    this.values = values;
  }

  _createClass(ValuesInput, [{
    key: "value",
    value: function value() {
      return this.values[Math.floor(Math.random() * this.values.length)];
    }
  }]);

  return ValuesInput;
}();

exports.default = ValuesInput;

},{}]},{},[2]);
