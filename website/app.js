// Global Variables
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=8551e904869639a0b2ffd4eec5b6ae74';
const zip = document.getElementById('zip').value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// POST Request
const postData = async (url = 'http://localhost:8000/weatherData', data = {}) => {

    const response = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log('error', error);
    }
};

// GET Request
const retrieveData = async (url='http://localhost:8000/weatherData') => {
    const request = await fetch(url);
    try {
        const allData = await request.json()
    }
    catch(error) {
        console.log('error', error);
    }
};

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    getData(baseURL+zip+apiKey)
}

const getData = async (baseURL, zip, apiKey) => {
    const request = await fetch(baseURL+zip+apiKey);
    try {
        const allData = await request.json()
    }catch(error) {
        console.log('error', error);
    }
};

// Update UI
const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].content;
    } catch(error) {
        console.log('error', error);
    }
}