// Setup empty JS object to act as endpoint for all routes
const data = [];

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

// Spin up the server
const port = 8080;
const server = app.listen(port, ()=>{ console.log(`server running on port:${port}`)});

// Initialize all route with a callback function
app.get('/', function (req, res) {
    res.status(200).sendFile(path.resolve(__dirname, 'dist/index.html'))
    
})

// Initialize function for GET request
app.get('/getTrips', getData);

// Callback function to complete GET '/getTrips'
function getData(req, res){
    res.send(data)
}

// Initialize function for POST request
app.post('/postTrip', sendData);

// Callback function for POST
function sendData(req, res){       
    entry={
    	city: req.body.city,
    	country: req.body.country,
        high: req.body.high,
        low: req.body.low,
        desc: req.body.desc,
        date: req.body.date,
        days: req.body.days
    }
    data.push(entry)
    res.send(data)
    console.log(data);
};

module.exports.app = app;