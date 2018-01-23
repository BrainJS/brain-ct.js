const data = {
  input: undefined,
  output: undefined,
}

function informAboutDependencies(){
  console.log(`Ensure you are including both Highcharts and the Draggable Points plugin, e.g. 
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://rawgithub.com/highcharts/draggable-points/master/draggable-points.js"></script>
You can find more information Highcharts and this plugin at https://www.highcharts.com/`);
}

export default function (trainedNet, options){
  data.input = trainedNet.outputs[0];
  data.output = trainedNet.outputs[trainedNet.outputs.length - 1];
  informAboutDependencies();
  return generateOptions(trainedNet, options);
}


function updateData(x, y, chart){
  data.input[x] = y;
  data.output = net.run(data.input);
  chart.series[1].setData(data.output, true, false, true);
  chart.redraw();
}

function generateOptions(trainedNet, options){
  return {
    chart: {
      animation: false
    },
    title: {
      text: 'Neural Net Explorer'
    },
    xAxis: [
      { categories: data.input.map((s, i) => `Input ${i}`) },
      { categories: [...data.output].map((s, i) => `Output ${i}`) },
    ],
      yAxis: {
    min: 0,
      max: 1
  },
    plotOptions: {
      series: {
        point: {
          events: {
            drag: function (e) {
              updateData(this.x, this.y, this.series.chart);
            },
            drop: function () {
              updateData(this.x, this.y, this.series.chart);
            }
          }
        },
        stickyTracking: false
      },
      line: {
        cursor: 'ns-resize'
      }
    },
    tooltip: {
      yDecimals: 2
    },
    series: [{
      data: [...data.input],
      name: `Inputs`,
      draggableY: true,
      dragMinY: 0,
      dragMaxY: 1,
      dragPrecision: 0.01,
      type: 'column',
      minPointLength: 2,
      xAxis: 0,
    }, {
      data: [...data.output],
      type: (options.outputType === 'point' ? 'point' : 'line'),
      name: 'Outputs',
      draggableY: false,
      xAxis: 1,
    }]
  }
}