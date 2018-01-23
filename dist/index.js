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
//# sourceMappingURL=index.js.map