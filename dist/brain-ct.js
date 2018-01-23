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
//# sourceMappingURL=brain-ct.js.map