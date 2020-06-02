import {getLocation} from '../js/functionsApp'
import {getImage} from '../js/functionsApp'

const apiKey = 'username=dominika_ongoing';
const baseURL = `http://api.geonames.org/searchJSON?${apiKey}&`;

const pixabayApiKey = '?key=14429196-984aeaa78fd5e3a738036f230'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`


function performAction(e) {
    // e.preventDefault();
  
    const country = document.getElementById('zip').value;
    getLocation(baseURL, country);
    getImage(pixabayBaseURL, country);
  };

  export {performAction}