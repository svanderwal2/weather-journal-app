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

// GET Route to return projectData
app.get('/all', getData)
function getData(req, res) {
    res.send(projectData)
}

// POST Route to projectData
app.post('/addWeather', addWeather);

function addWeather(req, res) {

    newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }

    projectData.push(newEntry)
    res.send(projectData)
    console.log(projectData)
}