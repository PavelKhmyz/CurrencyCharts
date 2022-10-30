const url = 'https://www.nbrb.by/api/exrates/currencies';
const day = 86400000;
const month = 2628000000;
const quarter = month * 3;
const year = month * 12;

document.querySelector('.dateFrom').valueAsDate = new Date();
document.querySelector('.monthPeriod').addEventListener('click', () => changePeriod(month));
document.querySelector('.quarterPeriod').addEventListener('click', () => changePeriod(quarter));
document.querySelector('.yearPeriod').addEventListener('click', () => changePeriod(year));
document.querySelector('.showButton').addEventListener('click', () => main());

function changePeriod(option){
    const newActualDate = new Date() - option;
    document.querySelector('.dateFrom').valueAsDate = new Date();
    document.querySelector('.dateTo').valueAsDate = new Date(newActualDate);
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
        const option = document.createElement('option');
        option.setAttribute('value', `${element}`);
        document.querySelector('#choise').append(option);
    });
};

function getUserData(){
    const userData = {};
    const change = new Date(document.querySelector('.dateFrom').value)
    change.setDate(change.getDate() + 1);

    userData.currencyName = document.querySelector('.currencyName').value;
    userData.dateFrom = + new Date(change);
    userData.dateTo = + new Date(document.querySelector('.dateTo').value);
    userData.userDateFrom = document.querySelector('.dateFrom').value;
    userData.userDateTo = document.querySelector('.dateTo').value;
    return userData;
}

compliteDataList();