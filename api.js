async function main(){
    const userData = getUserData();
    const curArr = await searchParentId(userData);
    const getRate = await parseForGetRate(curArr, userData);
    parseForChart(getRate, userData);
}
async function searchParentId(data){
    const request = await sendRequest(url);
    const curArr = [];
    let parentId;
    request.forEach(element => {
        if (element.Cur_Name === data.currencyName){
            parentId = element.Cur_ParentID;
        };
        if (element.Cur_ParentID === parentId){
            curArr.push(element)
        };
    });
    return curArr;
};

function parseForGetRate(curArr, userData){
    if(!userData.dateTo || userData.dateFrom - userData.dateTo < year){
        userData.dateTo = userData.dateFrom - year;
        return getRate(curArr, userData);
    }
    else{
        return getRate(curArr, userData);
    };
}

async function getRate(curArr, data){
    const rateArr = {curScale: getCurScale(curArr), rate: []};
    let requestCounter = Math.ceil((data.dateFrom - data.dateTo) / year);
    let start = data.dateTo;
    let end =  start + year;
    let curId = getCurId(curArr, data);

    for(let i = 0; i < requestCounter; i++){
        for(let i = 0; i < curArr.length; i++){
            if(start > + new Date(curArr[i].Cur_DateEnd)){}
            else if(start >= + new Date(curArr[i].Cur_DateStart) && end <= + new Date(curArr[i].Cur_DateEnd)){
                curId = curArr[i].Cur_ID;
                const makeUrl = createUrl(curId, start, end);
                const request = await sendRequest(makeUrl);
                const addScale = addScaleInRate(request, curArr[i].Cur_Scale)
                rateArr.rate = rateArr.rate.concat(addScale);
                start = end;
                end = start + year;

                break;
            }
            else if(start >= + new Date(curArr[i].Cur_DateStart) && end > + new Date(curArr[i].Cur_DateEnd)){
                curId = curArr[i].Cur_ID;                   
                end = + new Date(curArr[i].Cur_DateEnd);
                const makeUrl = createUrl(curId, start, end);
                const request = await sendRequest(makeUrl);
                const addScale = addScaleInRate(request, curArr[i].Cur_Scale)
                rateArr.rate = rateArr.rate.concat(addScale);
                requestCounter += 1;
                start = end + day;
                end = start + year;

                break;
            };
        };
    };
    console.log(rateArr)
    return rateArr;
};

async function sendRequest(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

function getCurId(curArr, data){
    curArr.forEach(element =>{
        if (data.dateFrom > + new Date(element.Cur_DateEnd)){}
        else {
            return element.Cur_ID;
        };
    });
};

function getCurScale(curArr){
    let curScale;
    curArr.forEach(element =>{
        if(+ new Date(element.Cur_DateEnd) > + new Date()){
            curScale = element.Cur_Scale;
        };
    });
    return curScale;
};

function addScaleInRate(request, mainCurScale){
    request.forEach(element => {
        element.Cur_Scale = mainCurScale;
    })
    return request;
}

function createUrl(curId, start, end) {
    const parseStartDate = new Date(start);
    const parseEndDate = new Date(end);
    const startDate = `${parseStartDate.getFullYear()}-${parseStartDate.getMonth() + 1}-${parseStartDate.getDate()}`
    const endDate = `${parseEndDate.getFullYear()}-${parseEndDate.getMonth() + 1}-${parseEndDate.getDate()}`

    return `https://www.nbrb.by/api/exrates/rates/dynamics/${curId}?startDate=${startDate}&endDate=${endDate}`;
};