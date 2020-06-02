
const pixabayApiKey = '?key=14429196-984aeaa78fd5e3a738036f230'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

//Personal API Key for Dark Blue  (weather)
const darkApiKey = 'ae6ef7c8ff0231dd4f01ee4108e6413b'
const darkBaseURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkApiKey}/`


// ########################      LOCATION    ################################
const getLocation = async(baseURL, location) =>{
    const city = location.split(',')[0].trim();
    const country = location.split(',')[1].trim();

    if(country.length > 2){
      // alert('test');
      document.getElementById('zip').style.border='1px solid red';
      document.getElementById('zip_error').style.display = 'block';

    }else {
      const res = await fetch(baseURL + 'country=' + country + '&q=' + city + '&maxRows=1');
      const data = await res.json();

      document.getElementById('zip_error').style.display = 'none';
      document.getElementById('zip').style.border='none';

      //console.log('test', data, res);
      await postData('/addGeoData', { 
        lat:data.geonames[0].lat,
        lng:data.geonames[0].lng, 
        countryName:data.geonames[0].countryName, 
        city_country:data.geonames[0].name  
      } )
      // show in UI
      
      await getWeather(darkBaseURL)
      await updateUI();
    }    
  }
  
  // ########################      IMAGE    ################################
  const getImage = async(pixabayBaseURL, location) =>{
    const city = location.split(',')[0];
    const res = await fetch(pixabayBaseURL +  city );
    const data = await res.json();
    // console.log('test', data.hits[0].largeImageURL);
    var image = document.getElementById('img-trip');
   image.src = data.hits[0].largeImageURL;
  }

  // ########################      Weather    ################################
  const getWeather = async(darkBaseURL, latitude, longitude) =>{

    const request = await fetch('/allGeoData' );
    const newData = await request.json();
    // latitude = document.getElementById('high').innerText;
    // longitude = document.getElementById('low').innerText;
    
    const res = await fetch(darkBaseURL +  newData[newData.length - 1].lat + ',' + newData[newData.length - 1].lng );
    const data = await res.json();

    await postWeather('/addWeatherData', {
      weather : data.daily.summary
    });
  
  }

  // ########################      postData    ################################

  const postData = async ( url = '', data = {})=>{
    console.log('postData :',data);      
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
         'Content-Type': 'application/json',
      },     
      body: JSON.stringify(data), 
    });
  
      try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
      }catch(error) {
      console.log("error post Data", error);
      }
  }
  // ########################      postWeather    ################################

  const postWeather = async ( url = '', data = {})=>{
        
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
        // console.log(weathData);
        return weathData;
      }catch(error) {
      console.log("error Weather Data", error);
      }
  }
  // UI UPDATE
const updateUI = async () => {
    let request = await fetch('/allGeoData');
    const newData = await request.json();

    request = await fetch('/WeatherData');
    const weathData = await request.json();
  
    // console.log("New Data");
    // console.log(newData);
    // console.log("Weather Data");
    // console.log(weathData);
    try{
  
    // Create a new date instance dynamically with JS 
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    let d = new Date();
    const departing = randomDate(new Date(2024, 2, 1), new Date((d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear()))
    
    // Today Date
    let newDate = new Date((d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear());
  
    //Calculate the difference in Time and in Days
    let differencie_in_time = (departing.getTime())-(newDate.getTime());
    let difference_in_days = Math.floor(differencie_in_time/(1000*3600*24));
    
    //#########################   update the UI    ############################################
    document.getElementById('date').innerHTML = `<h3>Today is: ${newDate.getDate()+'.'+(newDate.getMonth()+1)+'.'+ newDate.getFullYear()}</h3>`;
    document.getElementById('trips-time').innerHTML = `<h3>Departing: ${ departing.getDate()+'.'+(departing.getMonth()+1)+'.'+ departing.getFullYear()}</h3>`;  
    document.getElementById('days').innerHTML = `${difference_in_days}`
  
    
    document.getElementsByClassName('city_country')[0].innerHTML = newData[newData.length - 1].city_country;
    document.getElementsByClassName('city_country')[1].innerHTML = newData[newData.length - 1].city_country;
    document.getElementById('countryCode').innerHTML = newData[newData.length - 1].countryName;
    document.getElementById('high').innerHTML = newData[newData.length - 1].lat;
    document.getElementById('low').innerHTML = newData[newData.length - 1].lng;

    document.getElementById('weather').innerHTML = weathData[weathData.length -1].weather;
    
  
    }catch(error){
      console.log("error", error);
    }
  }


  export{ getLocation, getImage}