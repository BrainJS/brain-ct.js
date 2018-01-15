export default function highcharts(results, options) {
  return outputData(results, options).map(d => generateOptions(d, options))
}

function generateOptions(data, options){
  return {
    title: { text: 'Neural Net CT Scan' },
    boost: {
      useGPUTranslations: true,
      enabled: true,
    },
    chart: {
      parallelCoordinates: true,
        parallelAxes: {
        lineWidth: 2,
          min: 0,
          max: 1,
          tickAmount: 10,
      },
      width: 1000,
        height: 750,
    },
    plotOptions: {
      series: {
        animation: false,
          marker: {
          enabled: false,
            states: {
            hover: {
              enabled: false
            }
          }
        },
        states: {
          hover: {
            halo: {
              size: 0
            }
          }
        }
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
      '{series.name}: <b>{point.formattedValue}</b><br/>'
    },
    xAxis: {
      categories: [
        ...(new Array(data[0].data.length - 1)).fill(0).map((input, i) => `Input ${i}`),
        'Output'
      ],
        offset: 10
    },
    legend: false,
    series: data
  }
}

function pickHex(value, options) {
  const w = value * 2 - 1;
  const w1 = (w+1) / 2;
  const w2 = 1 - w1;
  const colors = options.colors || {};
  const alpha = colors.alpha || 0.05;
  const colorHigh = (colors.high || [0,0,255]).map(c => c*w1);
  const colorLow = (colors.low || [255,0,0]).map(c => c*w2);

  return 'rgba('+[
    colorHigh[0] + colorLow[0],
    colorHigh[1] + colorLow[1],
    colorHigh[2] + colorLow[2]
  ].map(c => Math.round(c)).join(',')+`,${alpha})`;
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

  return results[0].outputs.map((output, outputNumber) => {
    return [...results.map((result, iteration) => ({
        name: `Iteration ${iteration}`,
        data: coerceAllToNearest([ ...result.inputs, result.outputs[outputNumber]], options),
        color: pickHex(result.outputs[outputNumber], options),
        shadow: false,
        type: 'spline',
        boostThreshold: 1,
    }))];
  });
}