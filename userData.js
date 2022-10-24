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