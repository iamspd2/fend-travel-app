//API key for Pixabay
const pixabayApiKey = '?key=16855830-a7ff092bfdb95676fe9ebf73a'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

//API key for WeatherBit
const wbURL = 'https://api.weatherbit.io/v2.0/forecast/daily'
const wbKey = 'f2c967944f074f3da8bbd61a36ddb84d';

// ########################      LOCATION    ################################
const getData = async(baseURL, location) => {
  const city = location.split(',')[0].trim();
  const country = location.split(',')[1].trim();

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

    document.getElementById('zip').style.border='none';
      
    await getWeather(lat,lon,cityName,countryName);
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
const getWeather = async( lat, lon, city, country ) => {
  const res = await fetch(`${wbURL}?lat=${lat}&lon=${lon}&key=${wbKey}`);
  const forecast = await res.json();

  console.log(forecast);

  await postData('/postTrip', {
    city: city,
    country: country,
    high: forecast.data[0].high_temp,
    low: forecast.data[0].low_temp,
    desc: forecast.data[0].weather.description
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
  
  let request = await fetch('/getTrips');
  const w = await request.json();
  const l = w.length;
  console.log(w);
  
  try{
    // Create a new date instance dynamically with JS 
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    let d = new Date();
    const departing = randomDate(new Date(2024, 2, 1), new Date((d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear()))
    
    // Today Date
    let newDate = new Date((d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear());
    console.log(departing,newDate);
  
    //Calculate the difference in Time and in Days
    let differencie_in_time = (departing.getTime())-(newDate.getTime());
    let difference_in_days = Math.floor(differencie_in_time/(1000*3600*24));
    
    //#########################   update the UI    ############################################
    // document.getElementById('date').innerHTML = `<h3>Today is: ${newDate.getDate()+'.'+(newDate.getMonth()+1)+'.'+ newDate.getFullYear()}</h3>`;
    // document.getElementById('trips-time').innerHTML = `<h3>Departing: ${ departing.getDate()+'.'+(departing.getMonth()+1)+'.'+ departing.getFullYear()}</h3>`;  
    // document.getElementById('days').innerHTML = `${difference_in_days}`
  
    document.getElementById('dest').innerHTML = `Destination: ${w[l-1].city}, ${w[l-1].country}`;
    document.getElementById('dept').innerHTML = `Departure: 02/02/2020`;
    document.getElementById('days').innerHTML = `${w[l-1].city} is 20 days away`;
    document.getElementById('temp').innerHTML = `High: ${w[l-1].high}, Low: ${w[l-1].low}`;
    document.getElementById('desc').innerHTML = w[l-1].desc;
    
  
  }
  catch(error){
    console.log("error", error);
  }
}

export{ getData, getImage}
