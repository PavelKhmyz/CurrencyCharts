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
    getRate(curArr, data)
    
    // const dinamicUrl = `https://www.nbrb.by/api/exrates/rates/dynamics/${lol.Cur_ID}?startDate=${data.dateTo}&endDate=${data.dateFrom}`;
    
    // const getDinamics = await sendRequest(dinamicUrl);
    // console.log(getDinamics)
};

async function getRate(curArr, data){
    let startDate = data.dateTo; 
    const bla = new Date(data.dateTo);
    bla.setFullYear(bla.getFullYear() + 1);
    let endDate = `${bla.getFullYear()}-${bla.getMonth()}-${bla.getDate()}`
    
       
    let curId;
    

    for(let i = 0; i < curArr.length; i++){
        if(new Date(startDate) >= new Date(curArr[i].Cur_DateStart)){
            curId = curArr[i].Cur_ID;
        };
    };

    let dinamicUrl = `https://www.nbrb.by/api/exrates/rates/dynamics/${curId}?startDate=${startDate}&endDate=${endDate}`;
    
    // const requestCounter = Math.floor((new Date(data.dateFrom) - new Date(data.dateTo)) / year);
    // const rateArr = [];
    // for(let i = 0; i < requestCounter; i++){
    //     const request = await sendRequest(dinamicUrl)
    //     rateArr.push(request);

    //     const changeEndDate = new Date(endDate);
    //     changeEndDate.setFullYear(changeEndDate.getFullYear + 1);
    //     const changeStartDate = new Date(startDate);
    //     changeStartDate.setFullYear(changeStartDate.getFullYear + 1);

    //     endDate = `${changeEndDate.getFullYear()}-${changeEndDate.getMonth()}-${changeEndDate.getDate()}`;
    //     startDate = `${changeStartDate.getFullYear()}-${changeStartDate.getMonth()}-${changeStartDate.getDate()}`;

    //     for(let i = 0; i < curArr.length; i++){
    //         if(new Date(startDate) >= new Date(curArr[i].Cur_DateStart) && new Date(endDate) <= new Date(curArr[i].Cur_DateEnd)){
    //             curId = curArr[i].Cur_ID;
    //         }
    //         // else if(new Date(startDate) >= new Date(curArr[i].Cur_DateStart)){
    //         //     curId = curArr[i].Cur_ID;
    //         //     startDate = 
    //         // }
    //         console.log(startDate, endDate, changeEndDate, changeStartDate)
    //     };
    // }
    console.log(dinamicUrl);
}

function testDate(){
    const date = new Date('2020-10-10');
    date.setFullYear(date.getFullYear() + 1)
    return date;
}