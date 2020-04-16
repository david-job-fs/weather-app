const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, listening);

function listening() {
    console.log(`Server is running on localhost:${port}`);
}

// GET route
app.get('/all', (req, res) => res.send(projectData));

const add = (req, res) => {
  projectData = req.body;
  res.send(projectData);
}

// POST route
app.post('/post', add);