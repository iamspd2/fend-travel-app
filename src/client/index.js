import { performAction} from './js/performAction'
import { getLocation} from './js/functionsApp'
import { getImage} from './js/functionsApp'
import { postData} from './js/app'
import { updateUI} from './js/app'

import './styles/resets.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/base.scss'
import './styles/footer.scss'

import img from './media/dreamTravel.jpg';

const image = document.getElementById('img-trip');
image.src = img;
