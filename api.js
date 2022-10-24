function getUserData(){
    const userData = {};
    userData.currencyName = document.querySelector('.currencyName').value;
    userData.dateFrom = document.querySelector('.dateFrom').value;
    userData.dateTo = document.querySelector('.dateTo').value;
    console.log(userData);
    search(userData);
}

async function sendRequest(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

async function search(data){
    const bla = await sendRequest(url);
    const curArr = [];
    let parentId;
    bla.forEach(element => {
        if (element.Cur_Name === data.currencyName){
            parentId = element.Cur_ParentID;
        }
    })
    bla.forEach(element => {
        if (element.Cur_ParentID === parentId){
            curArr.push(element)
        }
    })
    if(!data.dateTo){
        getCur(curArr, data);
    }
    else if(new Date(data.dateFrom) - new Date(data.dateTo) < year){
        const changeDate = new Date(new Date(data.dateFrom) - year);
        data.dateTo = `${changeDate.getFullYear()}-${changeDate.getMonth() + 1}-${changeDate.getDate()}`;
        getRate(curArr, data);
    }
    else{
        getRate(curArr, data);
    }
    console.log(curArr, data);
};

async function getCur(curArr, data){
    let curId;
    const rateArr = [];
    for(let i = 0; i < curArr.length; i++){
        if (+ new Date(data.dateFrom) > + new Date(curArr[i].Cur_DateEnd)){

        }
        else {
            curId = curArr[i].Cur_ID;
            break;
        };
    };
    const createUrl = `https://www.nbrb.by/api/exrates/rates/${curId}?ondate=${data.dateFrom}`;
    const request = await sendRequest(createUrl);
    rateArr.push(request);
    console.log(rateArr);
}

async function getRate(curArr, data){
    const startDate = data.dateTo;
    const endDate = data.dateFrom;
    let requestCounter = Math.floor(((new Date(endDate) - new Date(startDate))) / year);
    const rateArr = [];

    let start = startDate;

    const parseDate = new Date(start);
    parseDate.setFullYear(parseDate.getFullYear() + 1);

    let end =  `${parseDate.getFullYear()}-${parseDate.getMonth() + 1}-${parseDate.getDate()}`;
    let curId;

    for(let i = 0; i < curArr.length; i++){
        if (+ new Date(start) > + new Date(curArr[i].Cur_DateEnd)){

        }
        else {
            curId = curArr[i].Cur_ID;
            break;
        };
    };

    for(let i = 0; i < requestCounter; i++){
        for(let i = 0; i < curArr.length; i++){
            if(+ new Date(start) > + new Date(curArr[i].Cur_DateEnd)){

            }
            else if(+ new Date(start) >= + new Date(curArr[i].Cur_DateStart) && + new Date(end) <= + new Date(curArr[i].Cur_DateEnd)){
                    curId = curArr[i].Cur_ID;

                    const makeUrl = createUrl(curId, start, end);
                    const request = await sendRequest(makeUrl);
                    rateArr.push(request);
                    // rateArr = request;

                    start = end;

                    const lol = new Date(start);
                    lol.setFullYear(lol.getFullYear() + 1);
                    end = `${lol.getFullYear()}-${lol.getMonth() + 1}-${lol.getDate()}`;

                    break;
            }
            else if(+ new Date(start) >= + new Date(curArr[i].Cur_DateStart) && + new Date(end) > + new Date(curArr[i].Cur_DateEnd)){
                curId = curArr[i].Cur_ID;                   
                end = curArr[i].Cur_DateEnd;

                const makeUrl = createUrl(curId, start, end);
                const request = await sendRequest(makeUrl);
                rateArr.push(request);
                // rateArr = request;

                requestCounter += 1;
                    
                const lol = new Date(end);
                lol.setDate(lol.getDate() + 1);
                start = `${lol.getFullYear()}-${lol.getMonth() + 1}-${lol.getDate()}`;

                const bla = new Date(start);
                bla.setFullYear(bla.getFullYear() + 1);
                end = `${bla.getFullYear()}-${bla.getMonth() + 1}-${bla.getDate()}`;
                    
                break;
            };
        };
    };
    // console.log(rateArr);
    parseForChart(rateArr)
};

let chartDate = [];
let chartRate = [];

let bla;

function parseForChart(rateArr){
    chartDate.length = 0;
    chartRate.length = 0;
    rateArr.forEach(element => {
        for(let i = 0; i < element.length; i++){
            // console.log(element[i].Date);
            chartDate.push(element[i].Date);
            chartRate.push(element[i].Cur_OfficialRate);
        }
    })
    if(bla){
        bla.destroy()
    }
    bla = new Chart(
        document.getElementById('myChart'),
        config
      );
}

function createUrl(curId, start, end) {
    return `https://www.nbrb.by/api/exrates/rates/dynamics/${curId}?startDate=${start}&endDate=${end}`;
};