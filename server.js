// Empty JS object to act as endpoint for all routes
projectData = {};

// Express Requirement
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log(`server is running on localhost: ${port}`);
}

// GET Route
app.get('/all', getProjData);

function getProjData (request, response) {
    response.send(projectData);
    console.log(projectData);
};

// POST Route
app.post('/addWeather', addEntry);

function addEntry (req, res) {

    newWeatherEntry = {
        date: req.body.date,
        zip: req.body.zip,
        temperature: req.body.temp,
        content: req.body.feelings,
    }
    Object.assign(projectData, newWeatherEntry);
};