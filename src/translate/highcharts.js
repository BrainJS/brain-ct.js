export default function highcharts(results) {
  return {
    chart: {
      type: 'heatmap',
      width: 1000,
      height: 1000,
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'top',
    },
    colorAxis: {
      stops: [
        [0, '#3060cf'],
        [0.5, '#fffbbc'],
        [0.9, '#c4463a'],
        [1, '#c4463a']
      ],
      min: 0,
      max: multiplier,
      startOnTick: false,
      endOnTick: false,
    },
    xAxis: {
      title: 'Input 1',
    },
    yAxis: {
      title: 'Input 2'
    },
    series: [{
      name: 'Neural Net CT Scan',
      data: seriesDataFromArray(results),
    }]
  }
}

const multiplier = 100;


function seriesDataFromArray(results) {
  /**
   * results = [{ inputs: [], outputs: []}]
   * @type {Array}
   */
  const series = [];
  results.forEach(result => {
    const {inputs, outputs} = result;
    for (let xInputIndex = 0; xInputIndex < inputs.length; xInputIndex++) {
      for (let yInputIndex = xInputIndex+1; yInputIndex < inputs.length; yInputIndex++) {
        series.push([
          inputs[xInputIndex]*multiplier,
          inputs[yInputIndex]*multiplier,
          outputs[0]*multiplier,
        ]);
      }
    }
  });

  return series;
}