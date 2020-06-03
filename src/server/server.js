// Setup empty JS object to act as endpoint for all routes
const data = [];
let newEntry = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Initialize all route with a callback function
app.get('/', function (req, res) {
    res.status(200).sendFile(path.resolve(__dirname, 'dist/index.html'))
    
})

// Initialize function for GET request
app.get('/getTrip', getEntry);

// Callback function to complete GET '/getTrip'
function getEntry(req, res){
    res.send(newEntry)
}

// Initialize function for GET request
app.get('/getTrips', getTrips);

// Callback function to complete GET '/getTrips'
function getTrips(req, res){
    res.send(data)
}

// Initialize function for POST request of current entry
app.post('/postTrip', sendEntry);

// Callback function for POST
function sendEntry(req, res) {       
    entry={
    	city: req.body.city,
    	country: req.body.country,
        high: req.body.high,
        low: req.body.low,
        desc: req.body.desc,
        date: req.body.date,
        days: req.body.days
    }
    newEntry = entry
    //newEntry.push(entry)
    res.send(newEntry)
    console.log(newEntry);
};

// Initialize function for POST request to save trip
app.post('/saveTrip', sendData);

// Callback function for POST
function sendData(req, res) {
    entry = newEntry
    data.push(entry)
    res.send(data)
    console.log(data);
};

// Spin up the server
const port = 8080;
const server = app.listen(port, ()=>{ console.log(`server running on port:${port}`)});

module.exports.app = app;