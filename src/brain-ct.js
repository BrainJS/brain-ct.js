import RandomInput from './random-input';

export default class BrainCT {
  constructor(net, inputGenerators) {
    this.net = net;
    this.inputGenerators = inputGenerators || this.randomInputGenerators();
  }

  randomInputGenerators() {
    const inputGenerators = [];
    for (let i = 0; i < this.net.sizes[0]; i++) {
      inputGenerators.push(new RandomInput());
    }
    return inputGenerators;
  }

  scanSync(iterations) {
    const results = [];
    for (let i = 0; i < iterations; i++) {
      const inputs = this.inputGenerators.map(iG => iG.value());
      const outputs = Array.prototype.slice.call(this.net.run(inputs));
      results.push({
        inputs,
        outputs
      });
    }

    return results;
  }
}