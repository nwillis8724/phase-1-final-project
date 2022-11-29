
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded');
})
let agendaDefault = document.getElementById("agenda_init")
let agendaErrorBanner = document.getElementById("agenda_error")
let moodErrorBanner = document.getElementById("mood_error")
let inputDiv = document.getElementById("input")
let agendaSelections = document.getElementById("agenda_ul").querySelectorAll("a")
let moodNum = document.getElementById("mood_input").value
let outputDiv = document.getElementById("output")
//ask ignas about that one command in html that does this

//captures innerHML of agenda selections, replaces default and dropbar dismessed
const agendaOptionSelected = function (){
    let agendaDialogue = this.innerHTML
    agendaDefault.innerHTML = agendaDialogue
    document.getElementById("dropdown").removeAttribute("open")
}

// create an onclick event for each agenda option
for (a of agendaSelections) {
    a.addEventListener('click', agendaOptionSelected) 
  }



//if agenda selection hasnt been made, set alert card to select first. else grab new value and store
const checkSelection = function (){
    let agendaStorage = document.getElementById("agenda")
    //see if agenda selection has been made
    if(agendaDefault.innerHTML === "What's on the agenda for today?"){
        agendaErrorBanner.removeAttribute("hidden")
        //set timeout for banner
        if(agendaErrorBanner.hidden === false){
            setTimeout(() => {agendaErrorBanner.setAttribute("hidden", true)}, 2000);
        }
    // check if the value is less than 1 or greater than 10     
    }else if(parseInt(document.getElementById("mood_input").value) < 1 || parseInt(document.getElementById("mood_input").value) > 10){
        // reset input value 
        document.getElementById("mood_input").value = " "
        moodErrorBanner.removeAttribute("hidden")
        //set timeout for banner
        if(moodErrorBanner.hidden === false){
            setTimeout(() => {moodErrorBanner.setAttribute("hidden", true)}, 2000);
        }
    }else{
            // grab new agendaDefault value and store in #stored_info. hides input div
            agendaStorage.innerHTML = agendaDefault.innerHTML
            inputDiv.setAttribute("hidden", true)
            outputDiv.removeAttribute("hidden")
}
}


//onclick submit hides the input after storing any value information from the mood meter
document.getElementById("submit").addEventListener("click", checkSelection)


//get #dropdown and remove open attribute to hide ul



//grab ul selection, replaces drop down text with ul selection, stores info, gets ready for hideInput







  