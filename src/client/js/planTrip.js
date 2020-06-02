import { getData } from '../js/functions'
import { getImage } from '../js/functions'

const apiKey = 'username=dominika_ongoing';
const baseURL = `http://api.geonames.org/searchJSON?${apiKey}&`;

const pixabayApiKey = '?key=16855830-a7ff092bfdb95676fe9ebf73a'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

function planTrip(e) {
	const country = document.getElementById('zip').value;
    getData(baseURL, country);
    getImage(pixabayBaseURL, country);
};

export { planTrip }