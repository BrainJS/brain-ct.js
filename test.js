import brain from 'brain.js';
import { BrainCT, Translate } from './src';

//create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork();
net.train([
  {input: [0, 0], output: [0, 1, 0, 1]},
  {input: [0, 1], output: [1, 0, 1, 0]},
  {input: [1, 0], output: [1, 0, 1, 0]},
  {input: [1, 1], output: [0, 1, 1, 0]},
]);

// array index to input of net
const brainCt = new BrainCT(net);


const displayOptions = {
  colors: {
    high: [255, 0, 0],
    low: [0, 0, 255],
    alpha: 0.025
  }
};
require('fs').writeFileSync('xor-highcharts.json', 'const ctScan = ' + JSON.stringify(Translate.from(brainCt).to.highchartsSync(displayOptions), null, 2));
