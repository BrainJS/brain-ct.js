export default function highcharts(results) {
  return {
    type: 'heatmap',
    xAxis: {
      categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
    },

    yAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      title: null
    },
  }
}

function xAxisLabels(results) {

}

function seriesFromArray(results) {
  const series = [];
  for (let i = 0; i < results.length; i++) {
    const { inputs, outputs } = results[i];
    for (let inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
      for (let outputIndex = 0; outputIndex < outputs.length; outputIndex++) {
        series.push([inputs[inputIndex], outputs[outputIndex]]);
      }
    }
  }
  return [{
    type: 'heatmap',
    data: [{
      name: 'A',
      value: 6,
      colorValue: 1
    }, {
      name: 'B',
      value: 6,
      colorValue: 2
    }, {
      name: 'C',
      value: 4,
      colorValue: 3
    }, {
      name: 'D',
      value: 3,
      colorValue: 4
    }, {
      name: 'E',
      value: 2,
      colorValue: 5
    }, {
      name: 'F',
      value: 2,
      colorValue: 6
    }, {
      name: 'G',
      value: 1,
      colorValue: 7
    }]
  }];
}