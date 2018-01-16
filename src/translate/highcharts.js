export default function highcharts(results, options) {
  return generateOptions(results, options)
}

function generateOptions(data, options){
  return {
    title: { text: 'Neural Net CT Scan' },
    boost: {
      useGPUTranslations: true,
      enabled: true,
    },
    chart: {
      width: 1000,
      height: 750,
      type: 'scatter',
    },
    plotOptions: {
      series: {
        animation: false,
      }
    },
    xAxis: {
      title: { text: 'Output' },
      min: 0,
      max: data[0].outputs.length,
      tickInterval: 1,
      gridLineWidth: 1,
    },
    yAxis: {
      title: { text: 'Input' },
      min: 0,
      max: data[0].inputs.length,
      tickInterval: 1,
      gridLineWidth: 1,
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
    },
    tooltip: {
      pointFormatter: function(){
        return `<b>Output:</b> ${this.x % 1}<br /><b>Input:</b> ${this.y %1}`
      }
    },
    series: outputData(data)
  }
}

function coerceAllToNearest(array, options) {
  options = options || {};
  if (!options.toNearest) return array;
  const multiplier = 1 / options.toNearest;
  return array.map(c => Math.round(c * multiplier) / multiplier);
}

function outputData(results, options) {
  /**
   * results = [{ inputs: [], outputs: []}]
   * @type {Array}
   */
  options = options || {};
  
  return results[0].outputs.map((o, oIndex) => ({
    id: `output${oIndex}`,
    name: `All Output ${oIndex}`, 
    showInLegend: true,
  })).concat(results.reduce((agg, result) => {
    result.inputs.forEach((input, inputNumber) => {
      result.outputs.forEach((output, outputNumber) => {
        const aggIndex = inputNumber + (outputNumber * result.inputs.length);
        agg[aggIndex] = agg[aggIndex] || {
          linkedTo: `output${outputNumber}`,
          showInLegend: true, 
          name: `Output ${outputNumber} - Input ${inputNumber}`,
          data: [],
          type: 'scatter',
          boostThreshold: 1, 
          marker: {
              radius: 0.3
          }
        };
        const x = output + outputNumber;
        const y = input + inputNumber;
        agg[aggIndex].data.push([x,y]);
      })
    })
    return agg;
  }, []));
}