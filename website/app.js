// Global Variables
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
let apiKey = '&appid=256f753b823c9ae73d727fff31527a6b';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// GET Request
const getData = async (baseURL, zip, apiKey) => {
    try {
        const res = await fetch (baseURL + zip + apiKey)
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

// POST Request
const postData = async (url = '', data = {}) => {
    try {
        const response = await fetch (url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return(response);
    } catch(error) {
        console.log('error', error);
    }
};

// Update UI 
const updateUI = async() => {
    const request = await fetch ('/all');
    try {
        const allData = await request.json();
        const date = document.getElementById('date').innerHTML = 'Date:  ' + allData.date;
        const zip = document.getElementById('zip').innerHTML = allData.zip;
        const temp = document.getElementById('temp').innerHTML = 'Temperature (F):  ' + allData.temperature;
        const content = document.getElementById('content').innerHTML = 'How I Feel:  ' + allData.content;
        console.log(allData);
    } catch(error) {
        console.log('error', error);
    }
};

// Click Event
document.getElementById('generate').addEventListener('click', performAction);

async function performAction(e) {
    const zip = document.getElementById('zip').value;
    const temp = document.getElementById('temp').value;
    const feelings = document.getElementById('feelings').value;

    getData(baseURL, zip, apiKey)
    .then(function(data) {
        console.log(data);
        postData('/addWeather', {date: newDate, zip, temp: data.main.temp, feelings});
    }).then(setTimeout(function () {
        updateUI();
    }, 1000))
};
