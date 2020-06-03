//API key for Pixabay
const pixabayApiKey = '?key=16855830-a7ff092bfdb95676fe9ebf73a'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

//API key for WeatherBit
const wbURL = 'https://api.weatherbit.io/v2.0/forecast/daily'
const wbKey = 'f2c967944f074f3da8bbd61a36ddb84d';

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function findDays(date) {
  const da = date.split('/');
  const d = da[0]; const m = da[1]; const y = da[2];
  const departure_date = new Date(`${m}/${d}/${y}`);
  const current_date = new Date(); 

  // To calculate the time difference of two dates 
  const time = departure_date.getTime() - current_date.getTime(); 

  // To calculate the no. of days between two dates 
  const days = time / (1000 * 3600 * 24); 

  //To display the final no. of days (result) 
  console.log(days);
  return Number(Math.round(days));
}

// ########################      LOCATION    ################################
const getData = async(baseURL, location, date) => {
  const city = location.split(',')[0].trim();
  const country = location.split(',')[1].trim();

  // if(isValidDate(date.trim()) == false){
  //   alert('Please check your departure date!');
  //   return;
  // } 

  if(country.length > 2) {
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
    await updateUI();
  }    
}
  
  // ########################      IMAGE    ################################
const getImage = async ( pixabayBaseURL, location ) => {
  const city = location.split(',')[0];
  const res = await fetch(pixabayBaseURL +  city );
  const data = await res.json();
  var image = document.getElementById('thumb');
  image.src = data.hits[0].largeImageURL;
}

  // ########################      Weather    ################################
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

  // ########################      postWeather    ################################

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
  // UI UPDATE
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

const updateUI2 = async () => {

  await postData('/saveTrip', {});

  let request = await fetch('/getTrips');
  const w = await request.json();
  const l = w.length;
  console.log(w);
  
  // try{
    
  //   document.getElementById('dest').innerHTML = `Destination: ${w[l-1].city}, ${w[l-1].country}`;
  //   document.getElementById('dept').innerHTML = `Departure: ${w[l-1].date}`;
  //   document.getElementById('days').innerHTML = `${w[l-1].city} is ${w[l-1].days} days away`;
  //   document.getElementById('temp').innerHTML = `High: ${w[l-1].high}, Low: ${w[l-1].low}`;
  //   document.getElementById('desc').innerHTML = w[l-1].desc;
  
  // }
  // catch(error){
  //   console.log("error", error);
  // }
}

export{ getData, getImage, updateUI2 }
