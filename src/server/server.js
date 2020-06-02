// Setup empty JS object to act as endpoint for all routes
const geoData = [];
const weatherData = [];

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

app.get('/allGeoData', getData);
app.get('/WeatherData', getWeatherData);

// Callback functions to complete GET '/all'
function getData(req, res){
    res.send(geoData)
}

// Callback functions to complete GET '/all'
function getWeatherData(req, res){
    res.send(weatherData)
}

// Post Route
app.post("/", function(req, res){
    request(baseURL)
})

// Callback function for POST
app.post('/addGeoData', post1);

function post1(req, res){       
    newEntry={
        lat: req.body.lat,
        lng: req.body.lng,
        countryName: req.body.countryName,
        city_country: req.body.city_country
    }
    geoData.push(newEntry)
    res.send(geoData)
    console.log(geoData);
}

app.post('/addWeatherData', post2);

function post2(req, res){       
    weatherEntry={
        weather :req.body.weather
    }
    weatherData.push(weatherEntry)
    res.send(weatherData)
    console.log(weatherData);
};


// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    // console.log('Example app listening on port 8080!')
})


module.exports.app = app;