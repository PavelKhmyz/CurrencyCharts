let chart; 
const labels = [];
const rate = [];
const denominateBorder = 100;
const denominateScale = 10000; 
const data = {
  labels: labels,
  datasets: [{
    label: 'Currency Rate',
    data: rate,
    borderColor: 'rgb(30,144,255)',
    backgroundColor: 'rgb(255, 99, 132)',
    pointRadius: 2,
    pointHoverRadius: 5
  }]
};          
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
      }
    }
  }
};

function parseForChart(rateArr, data){ // привести функцию в божеский вид
    labels.length = 0;
    rate.length = 0;
    config.options.plugins.title.text = data.currencyName;
    if(!data.userDateTo){
        rateArr.rate.forEach(elem => {
          if(elem.Date.slice(0, 10) === data.userDateFrom){
            labels.push(elem.Date.slice(0, 10));
            const currencyRate = rateScale(elem, rateArr.curScale)
            rate.push(currencyRate)
          }
        });
    }
    else{
        rateArr.rate.forEach(elem => {
          if(elem.Date.slice(0, 10) >= data.userDateTo && elem.Date.slice(0, 10) <= data.userDateFrom){
            labels.push(elem.Date.slice(0, 10));
            const currencyRate = rateScale(elem, rateArr.curScale)
            rate.push(currencyRate);
          };
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

function rateScale(elem, curScale){
  let rate;
  if(elem.Cur_Scale === curScale){
    rate = elem.Cur_OfficialRate;
  }
  else{
    rate = elem.Cur_OfficialRate * (curScale / elem.Cur_Scale);
  };
  const currencyRate = denominateRate(elem, rate)
  return currencyRate;
}

function denominateRate(elem, rate){
  let denominate;
  if (+ new Date(elem.Date.slice(0, 10)) < + new Date('2000-01-01')){
    denominate = rate / 10000000
  }
  else {
    denominate = rate
  }
  if (denominate > denominateBorder){
    denominate = denominate / denominateScale;
  };
  return denominate;
};