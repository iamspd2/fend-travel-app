'use strict'

import {performAction} from '../js/performAction'

/* Global Variables */
//Personal API Key for Pixabay  (Photo)
const pixabayApiKey = '?key=14429196-984aeaa78fd5e3a738036f230'
const pixabayBaseURL = `https://pixabay.com/api/${pixabayApiKey}&q=`

//Personal API Key for Dark Blue  (weather)
const darkApiKey = 'ae6ef7c8ff0231dd4f01ee4108e6413b'
const darkBaseURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkApiKey}/`

// Personal API Key for GEONAMES API  (location, lat, low)
const apiKey = 'username=dominika_ongoing';
const baseURL = `http://api.geonames.org/searchJSON?${apiKey}&`;

document.getElementById('generate').addEventListener('click', performAction);


// ###################       Add Note      ##################################
function toggleNotes() {
  let notes = document.querySelector('.notes');
    notes.classList.toggle('text-show');
}
// toggle (add) note button
let addbtn = document.getElementById('btn-note');
addbtn.addEventListener('click', function(){
  toggleNotes()
});

//  SAVE 
let note_btn = document.getElementById('text-submit-btn');
note_btn.addEventListener('click', function(){
  const note = document.getElementById('text-notes').value;
  document.getElementById('last-note').innerText =  note;
  toggleNotes()
});


