export default class BrainCT {
  constructor(net, inputGenerators) {
    this.net = net;
    this.inputGenerators = inputGenerators;
  }

  scanSync(iterations) {
    const results = [];
    for (let i = 0; i < iterations; i++) {
      const inputs = [];
      for (const p in this.inputGenerators) {
        inputs[p] = this.inputGenerators[p].value();
      }
      const outputs = this.net.run(inputs);
      results.push({
        inputs,
        outputs
      });
    }

    return results;
  }
}