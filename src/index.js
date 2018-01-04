import { Translate } from './translate';

export BrainCT from './brain-ct';
export RandomInput from './random-input';
export ValuesInput from './values-input';
export Translate from './translate';

export function translate() {
  return new Translate();
}