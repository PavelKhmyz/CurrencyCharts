const url = 'https://www.nbrb.by/api/exrates/currencies';
const month = 2628000000;
const quarter = month * 3;
const year = month * 12;


document.querySelector('.dateFrom').valueAsDate = new Date();

document.querySelector('.monthPeriod').addEventListener('click', () => changePeriod(month));
document.querySelector('.quarterPeriod').addEventListener('click', () => changePeriod(quarter));
document.querySelector('.yearPeriod').addEventListener('click', () => changePeriod(year));

document.querySelector('.showButton').addEventListener('click', () => getUserData());

function changePeriod(option){
    document.querySelector('.dateFrom').valueAsDate = new Date();
    const newActualDate = new Date() - option;
    document.querySelector('.dateTo').valueAsDate = new Date(newActualDate);
}

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

async function compliteDataList(){
    const data = await sendRequest(url);
    const result = [];
    data.forEach(element => {
        result.push(element.Cur_Name)
    });
    const uniqueChars = result.filter((element, index) => {
        return result.indexOf(element) === index;
    });
    uniqueChars.forEach(element => {
        const data = document.createElement('option');
        data.setAttribute('value', `${element}`);
        document.querySelector('#choise').append(data);
    });
};

compliteDataList();


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
    console.log(curArr);
    getRate(curArr, data);
};

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

                requestCounter += 1;
                    
                const lol = new Date(end);
                lol.setDate(lol.getDate() + 1);
                start = `${lol.getFullYear()}-${lol.getMonth() + 1}-${lol.getDate()}`;

                const bla = new Date(start);
                bla.setFullYear(bla.getFullYear() + 1);
                end = `${bla.getFullYear()}-${bla.getMonth() + 1}-${bla.getDate()}`;
                console.log(start, end, curId);
                    
                break;
            };
        };
    };
    console.log(rateArr);
};

function createUrl(curId, start, end) {
    return `https://www.nbrb.by/api/exrates/rates/dynamics/${curId}?startDate=${start}&endDate=${end}`;
};