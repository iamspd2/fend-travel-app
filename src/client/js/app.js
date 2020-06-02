/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const key = 'edfba7dace18d8e9a41a40fb91152652';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateFeel);

/* Function called by event listener */
function generateFeel(e){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemp(baseURL, zip, key)
    .then(function (data){
        // Add data to POST request
        postData('http://localhost:3000/addData', { date: newDate, temp: data.main.temp, content: feelings } )
        // Function which updates UI
        .then(function() {
            updateUI();
        })
    })
}

/* API call format to get current weather data by zipcode:
api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key} */

// Function to GET Web API Data
const getTemp = async (baseURL, zip, key)=>{
	// Building full URL for API call with India as country
    const response = await fetch(baseURL + zip + ',in' + '&appid=' + key)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}


/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log(error);
    }
}


/* Function to GET Project Data */
// Update user interface
const updateUI = async () => {
    const request = await fetch('http://localhost:3000/all');
    try {
        const weatherData = await request.json();
        document.getElementById('date').innerHTML = 'Date: '+weatherData.date;
        document.getElementById('temp').innerHTML = 'Temperature: '+weatherData.temp+' K or '+(Number(weatherData.temp)-273).toFixed(2)+ ' °C';
        document.getElementById('content').innerHTML = 'How you feel: '+weatherData.content;
    }
    catch (error) {
        console.log('error', error);
    }
}