//API key for Pixabay
const pixabayApiKey = '?key=16855830-a7ff092bfdb95676fe9ebf73a'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

//API key for WeatherBit
const wbURL = 'https://api.weatherbit.io/v2.0/forecast/daily'
const wbKey = 'f2c967944f074f3da8bbd61a36ddb84d';

//API key for Geonames
const geoKey = 'username=dominika_ongoing';
const geoURL = `http://api.geonames.org/searchJSON?${geoKey}&`;


import { planTrip } from '../js/planTrip'
import { saveTrip } from '../js/planTrip'

document.getElementById('generate').addEventListener('click', planTrip);
document.getElementById('save').addEventListener('click', saveTrip);
