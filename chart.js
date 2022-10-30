let chart; 
const labels = [];
const rate = [];
const denominateBorder = 10;
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
            const currencyRate = denominateRate(elem.Cur_Scale, rateArr.curScale, elem.Cur_OfficialRate)
            rate.push(currencyRate)
          }
        });
    }
    else{
        rateArr.rate.forEach(elem => {
          if(elem.Date.slice(0, 10) >= data.userDateTo && elem.Date.slice(0, 10) <= data.userDateFrom){
            labels.push(elem.Date.slice(0, 10));
            const currencyRate = denominateRate(elem.Cur_Scale, rateArr.curScale, elem.Cur_OfficialRate)
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

function denominateRate(mainCurScale, curScale, rate){
  let currencyRate;
  if(mainCurScale === curScale){
    currencyRate = rate;
  }
  else{
    currencyRate = rate * (curScale / mainCurScale);
  };
  if (currencyRate > denominateBorder){
    currencyRate = currencyRate / denominateScale;
  };
  return currencyRate;
}