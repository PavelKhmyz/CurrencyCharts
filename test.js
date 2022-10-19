const url = 'https://www.nbrb.by/api/exrates/currencies';
const urlRate = 'https://www.nbrb.by/api/exrates/rates/190?ondate=2015-9-10';

async function sendRequest(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
async function parsing(url){
    const data = await sendRequest(url);
    const sortById = {};
    for (let i = 0; i < data.length; i++){
        if (sortById[data[i].Cur_ParentID]){
            sortById[data[i].Cur_ParentID].push(data[i]);
        } 
        else{
            sortById[data[i].Cur_ParentID] = [data[i]];
        };
    };
    return sortById;
};

async function search (name) {
    const data = await sendRequest(url);
    const result = [];
    data.forEach(element => {
        if (element.Cur_Name === name){
            // result.push(element);
            result.push(element.Cur_ParentID);
        };
    });
    return result;
};

async function bla () {
    const data = await sendRequest(url);
    const result = [];
    data.forEach(element => {
        result.push(element.Cur_ParentID + element.Cur_Name)
    });
    return result;
}