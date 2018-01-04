export default class BrainCT {
  constructor(net, inputGenerators) {
    this.net = net;
    this.results = {};
    this.inputGenerators = inputGenerators;
    if (Array.isArray(this.inputGenerators)) {
      this.scan = this.scanArray;
    } else {
      this.scan = this.scanObject;
    }
  }

  scanObject(iterations) {
    for (let i = 0; i < iterations; i++) {
      const inputs = {};
      for (const p in this.inputGenerators) {
        inputs[p] = this.inputGenerators[p].value();
      }
      const outputs = this.net.run(inputs);
      this.results.push({
        inputs,
        outputs
      });
    }
  }

  scanArray(iterations) {
    for (let i = 0; i < iterations; i++) {
      const inputs = this.inputGenerators.map(input => input.value());
      const outputs = this.net.run();
      this.results.push({
        inputs,
        outputs
      });
    }
  }
}