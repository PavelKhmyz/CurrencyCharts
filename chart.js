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

const labels = [];
const rate = [];
  
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

let chart;

function parseForChart(rateArr, data){ // привести функцию в божеский вид
    labels.length = 0;
    rate.length = 0;
    let bla;
    if(!data.userDateTo){
      rateArr.rate.forEach(element =>{
        element.forEach(elem => {
          if(elem.Date.slice(0, 10) === data.userDateFrom){
            labels.push(elem.Date.slice(0, 10));
            if(elem.Cur_Scale === rateArr.curScale){
              bla = elem.Cur_OfficialRate;
            }
            else{
              bla = elem.Cur_OfficialRate * (rateArr.curScale / elem.Cur_Scale);
            };
            if (bla > 100){
              bla = bla / 10000;
            };
            rate.push(bla)
          }
        });
      });
    }
    else{
      rateArr.rate.forEach(element => {
        element.forEach(elem => {
          if(elem.Date.slice(0, 10) >= data.userDateTo && elem.Date.slice(0, 10) <= data.userDateFrom){
            labels.push(elem.Date.slice(0, 10));
            if(elem.Cur_Scale === rateArr.curScale){
              bla = elem.Cur_OfficialRate;
            }
            else{
              bla = elem.Cur_OfficialRate * (rateArr.curScale / elem.Cur_Scale);
            };
            if (bla > 100){
              bla = bla / 10000;
            };
            rate.push(bla);
          };
        });
      });
    };
    if(chart){
      chart.destroy()
    }
    chart = new Chart(
      document.getElementById('myChart'),
      config
    );
};