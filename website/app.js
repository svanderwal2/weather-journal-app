// Global Variables
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
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
        console.log(allData);
        const date = document.getElementById('date').innerHTML = allData.date;
        const zip = document.getElementById('zip').innerHTML = allData.zip;
        const temp = document.getElementById('temp').innerHTML = allData.tamp;
        const content = document.getElementById('content').innerHTML = allData.feelings;
    } catch(error) {
        console.log('error', error);
    }
};

// Click Event
document.getElementById('generate').addEventListener('click', performAction);

async function performAction(e) {
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
    const data = await getData(baseURL, zip, apiKey);
    const response = await postData('/addWeather', {
        date: newDate,
        zip,
        temp,
        feelings
    });
    console.log(response)
    const newUI = await updateUI();
};
