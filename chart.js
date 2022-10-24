const actions = [
    {
      name: 'pointStyle: circle (default)',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'cirlce';
        });
        chart.update();
      }
    },
    {
      name: 'pointStyle: cross',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'cross';
        });
        chart.update();
      }
    },
    {
      name: 'pointStyle: crossRot',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'crossRot';
        });
        chart.update();
      }
    },
    {
      name: 'pointStyle: dash',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'dash';
        });
        chart.update();
      }
    },
    {
      name: 'pointStyle: line',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'line';
        });
        chart.update();
      }
    },
    {
      name: 'pointStyle: rect',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'rect';
        });
        chart.update();
      }
    },
    {
      name: 'pointStyle: rectRounded',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'rectRounded';
        });
        chart.update();
      }
    },
    {
      name: 'pointStyle: rectRot',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'rectRot';
        });
        chart.update();
      }
    },
    {
      name: 'pointStyle: star',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'star';
        });
        chart.update();
      }
    },
    {
      name: 'pointStyle: triangle',
      handler: (chart) => {
        chart.data.datasets.forEach(dataset => {
          dataset.pointStyle = 'triangle';
        });
        chart.update();
      }
    }
];

const labels = chartDate;
const rate = chartRate;
  
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Dataset',
            data: rate,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
            pointStyle: 'circle',
            pointRadius: 2,
            pointHoverRadius: 5
        }
    ]
};
          
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
            }
        }
    }
};