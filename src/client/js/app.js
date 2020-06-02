import { planTrip } from '../js/planTrip'

document.getElementById('generate').addEventListener('click', planTrip);

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
