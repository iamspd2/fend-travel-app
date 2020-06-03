import { isValidDate, findDays } from './date'

//API key for Pixabay
const pixabayApiKey = '?key=16855830-a7ff092bfdb95676fe9ebf73a'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

//API key for WeatherBit
const wbURL = 'https://api.weatherbit.io/v2.0/forecast/daily'
const wbKey = 'f2c967944f074f3da8bbd61a36ddb84d';

// Function to get all the data for the given searched location
const getData = async(baseURL, location, date) => {
  const city = location.split(',')[0].trim();
  const country = location.split(',')[1].trim();

  if(isValidDate(date.trim()) == false){
    alert('Please check your departure date!');
    return;
  } 

  if(country.length > 2) {
    alert('Please check your country code!')
    document.getElementById('zip').style.border = '1px solid red';
  }
  else {
    const res = await fetch(`${baseURL}country=${country}&q=${city}&maxRows=1`);
    const data = await res.json();
    if(data.totalResultsCount == 0) {
      alert('Please check your travel location!');
      return;
    }
    console.log(data);
    const lat = data.geonames[0].lat;
    const lon = data.geonames[0].lng;
    const cityName = data.geonames[0].name;
    const countryName = data.geonames[0].countryName;
      
    await getWeather(lat,lon,cityName,countryName,date);
    await getImage(pixabayBaseURL,location);
    await updateUI();
  }    
}
  
// Function to get the image URL from Pixabay
const getImage = async ( pixabayBaseURL, location ) => {
  const city = location.split(',')[0];
  const res = await fetch(pixabayBaseURL +  city );
  const data = await res.json();
  console.log(data);
  var image = document.getElementById('thumb');
  if (data.total !=0)
    image.src = data.hits[0].largeImageURL;
  else
    image.src = './public/img.jpg';
}

// Function to get the weather forecast from WeatherBit
const getWeather = async( lat, lon, city, country, date ) => {
  const res = await fetch(`${wbURL}?lat=${lat}&lon=${lon}&key=${wbKey}`);
  const forecast = await res.json();

  const days = findDays(date);
  console.log(`Days left: ${days}`)

  console.log(forecast);
  let d = 15;

  if(days < 15) {
    d = days;
  }

  await postData('/postTrip', {
    city: city,
    country: country,
    high: forecast.data[d].high_temp,
    low: forecast.data[d].low_temp,
    desc: forecast.data[d].weather.description,
    date: date,
    days: days
  });
}

// Function to post complete data about the trip
const postData = async ( url = '', data = {}) => {
  console.log('postWeather :',data);      
        
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },     
    body: JSON.stringify(data), 
  });
  
  try {
    const weathData = await response.json();
    return weathData;
  }
  catch(error) {
    console.log("error Weather Data", error);
  }
}

// Function to update the UI of the trip planning section
const updateUI = async () => {
  
  let request = await fetch('/getTrip');
  const d = await request.json();
  const l = d.length;
  console.log(d);
  
  try{
    
    document.getElementById('dest').innerHTML = `Destination: ${d.city}, ${d.country}`;
    document.getElementById('dept').innerHTML = `Departure: ${d.date}`;
    document.getElementById('days').innerHTML = `${d.city} is ${d.days} days away`;
    document.getElementById('temp').innerHTML = `High: ${d.high}, Low: ${d.low}`;
    document.getElementById('desc').innerHTML = d.desc;
  
  }
  catch(error){
    console.log("error", error);
  }
}

// Function to update the UI of the saved trips list
const updateUI2 = async () => {

  await postData('/saveTrip', {});

  let request = await fetch('/getTrips');
  const w = await request.json();
  const l = w.length;
  console.log(w);
  let i;
  let trip_str='';

  for(i of w) {
    trip_str = trip_str.concat(`<div class="trip data">
        <h3>Destination: ${i.city}, ${i.country}</h3>
        <h3>Departure: ${i.date}</h3>
        <h4>High: ${i.high}, Low: ${i.low}</h4>
        <h4>${i.desc}</h4>
      </div><br><br>`);
  }

  console.log(trip_str);
  document.getElementById('trips').innerHTML = trip_str;

}

export{ isValidDate, getData, getImage, updateUI2 }
