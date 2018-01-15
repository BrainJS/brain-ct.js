export default function highcharts(results, options) {
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
        ...results[0].inputs.map((input, i) => `Input ${i}`),
        ...results[0].outputs.map((out, i) => `Output ${i}`)
      ],
      offset: 10
    },
    legend: false,
    series: seriesFromArray(results, options)
  }
}

function pickHex(value, options) {
  var w = value * 2 - 1;
  var w1 = (w+1) / 2;
  var w2 = 1 - w1;
  const colors = options.colors || {};
  const colorHigh = (colors.high || [0,0,255]).map(c => c*w1);
  const colorLow = (colors.low || [255,0,0]).map(c => c*w2);

  return 'rgba('+[
    colorHigh[0] + colorLow[0],
    colorHigh[1] + colorLow[1],
    colorHigh[2] + colorLow[2]
  ].map(c => Math.round(c)).join(',')+',0.05)';
}

function seriesFromArray(results, options) {
  /**
   * results = [{ inputs: [], outputs: []}]
   * @type {Array}
   */
  options = options || {};
  const coerceToValue = (array, options) => {
    if (!options.toNearest) return array;
    const multiplier = 1 / options.toNearest;
    return array.map(c => Math.round(c * multiplier) / multiplier);
  }

  return [...results.map((result, iteration) => ({
    name: `Iteration ${iteration}`,
    data: coerceToValue([ ...result.inputs, ...result.outputs ], options),
    color: pickHex(result.outputs[0], options),
    shadow: false,
    type: 'spline',
    boostThreshold: 1,
  }))];
}