export default function highcharts(results) {
  return {
    chart: {
      type: 'heatmap',
    },
    xAxis: {
      // categories: null,
      title: 'Input/Output',
    },
    yAxis: {
      // categories: null,
      title: 'Input Value'
    },
    series: seriesFromArray(results)
  }
}

function xAxisLabels(results) {

}

function seriesFromArray(results) {
  /**
   * results = [{ inputs: [], outputs: []}]
   * @type {Array}
   */
  const series = [];
  for (let i = 0; i < results.length; i++) {
    let seriesIndex = 0;
    const { inputs, outputs } = results[i];
    for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
      for (let outputIndex = 0; outputIndex < outputs.length; outputIndex++) {
        series.push({
          x: seriesIndex++,
          y: inputs[inputIndex],
          value: outputs[outputIndex],
          name: `I${inputIndex} - O${outputIndex}`,
        });
      }
    }
  }

  return {
    name: 'Neural Net CT Scan',
    data: series,
  };
}