import { getData } from '../js/functions'
import { getImage } from '../js/functions'
import { updateUI2 } from '../js/functions'

const apiKey = 'username=dominika_ongoing';
const baseURL = `http://api.geonames.org/searchJSON?${apiKey}&`;

const pixabayApiKey = '?key=16855830-a7ff092bfdb95676fe9ebf73a'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

function planTrip(e) {
	const destination = document.getElementById('zip').value;
	const date = document.getElementById('date').value;
    getData(baseURL, destination, date);
};

function saveTrip(e) {
	updateUI2();
};

export { planTrip }
export { saveTrip }