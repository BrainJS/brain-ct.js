import brain from 'brain.js';
import { BrainCT, RandomInput, ValuesInput, compose, Translate } from './src';

//create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork();
net.train([{input: [0, 0], output: [0]},
  {input: [0, 1], output: [1]},
  {input: [1, 0], output: [1]},
  {input: [1, 1], output: [0]}]);

// array index to input of net
const brainCt = new BrainCT(net, [
  new RandomInput(),
  new RandomInput()
]);

require('fs').writeFileSync('xor-highcharts.json', 'const ctScan = ' + JSON.stringify(Translate.from(brainCt).to.highchartsSync(), null, 2));
