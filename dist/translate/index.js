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
//# sourceMappingURL=index.js.map