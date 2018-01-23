import BrainCT from './brain-ct';
import RandomInput from './random-input';
import Translate from './translate';
import ValuesInput from './values-input';

const brainCT = {
  BrainCT,
  RandomInput,
  Translate,
  ValuesInput,
};

export default brainCT;


if (typeof window !== 'undefined') {
  window.brainCT = brainCT;
}