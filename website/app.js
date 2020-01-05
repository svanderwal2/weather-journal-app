// Global Variables
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=256f753b823c9ae73d727fff31527a6b';
const zip = document.getElementById('entryHolder').value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// POST Request
const postData = async (url = '', data = {}) => {
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
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    getData(baseURL, zip, apiKey)
}

const getData = async (baseURL, zip, apiKey) => {
    const request = await fetch(baseURL+zip+apiKey);
    try {
        const allData = await request.json()
    }catch(error) {
        console.log('error', error);
    }
};

function postGet() {
    postData('/weather', {date: newDate, temp:data.temp, content: data.content})
        .then(function(data) {
            getData('/all')
        })
}

// document.getElementById('generate').addEventListener('click', performAction);
// function performAction(e) {
//     const newDate = document.getElementById('date').value;
//     const newTemp = document.getElementById('temp').value;
//     const newContent = document.getElementById('content').value;

//     getData('/weatherData')
//     .then(function(projectData) {
//         console.log(projectData);
//         postData('/addWeather', {date:data.date, temp:data.temp, content:content})
//         updateUI()
//     })
// }

// Update UI
const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTML = allData[0].content;
    } catch(error) {
        console.log('error', error);
    }
}