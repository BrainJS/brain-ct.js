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
          outputType: 'scatter'
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
//# sourceMappingURL=index.js.map