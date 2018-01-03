# NOTE: PLANNING PHASE
# brain-ct.js
CT scanner for your brain.js neural network

## planned usage
### instantiation
Note: `net` is an instance of brain.js
```js
import { BrainCT, RandomInput, ValuesInput } from 'brain-ct.js';


// array index to input of net
const brainCt = new BrainCT(net, [
  new ValuesInput([0, 1]),
  new ValuesInput([0.25, 0.50, 0.75, 1]),
  new RandomInput(),
  new RandomInput(),
  new RandomInput(),
  new RandomInput()
]);


// object key input of net
const brainCt = new BrainCT(net, {
  gender: new ValuesInput([0, 1]),
  referrer: new ValuesInput([0.25, 0.50, 0.75, 1]),
  dateOfBirth: new RandomInput(),
  city: new RandomInput(),
  age: new RandomInput(),
  membershipExpiration: new RandomInput()
});
```

### scanning
```js
const data = brainCt.scanSync({ iteration: 50000 });
const data = await brainCt.scan({ iteration: 50000 });
```


### All you really need to know.  getting chart data, Highcharts example
```js
import { translate } from 'brain-ct.js';
Highcharts.chart('container', await translate.from(brainCt).to.highcharts());
Highcharts.chart('container', translate.from(brainCt).to.highchartsSync());
```