
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded');
})

//grab date and time
let dt = new Date();
document.getElementById("datetime").innerHTML = dt

//create random number
function getRandomInt(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}
//different variables
let agendaDefault = document.getElementById("agenda_init")
let agendaErrorBanner = document.getElementById("agenda_error")
let moodErrorBanner = document.getElementById("mood_error")
let inputDiv = document.getElementById("input")
let agendaSelections = document.getElementById("agenda_ul").querySelectorAll("a")
let moodNum = document.getElementById("mood_input").value
let outputDiv = document.getElementById("output")
//ask ignas about that one command in html that does this

//captures innerHML of agenda selections, replaces default and dropbar dismissed
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
const checkSelections = function (){
    let agendaStorage = document.getElementById("agenda")
    //see if agenda selection has been made
    if(agendaDefault.innerHTML === "What's on the agenda for today?"){
        agendaErrorBanner.removeAttribute("hidden")
        //set timeout for banner
        if(agendaErrorBanner.hidden === false){
            setTimeout(() => {agendaErrorBanner.setAttribute("hidden", true)}, 5000);
        }
    // check if the value is less than 1 or greater than 10     (figure out how to make ' ' invalid input)
    }else if(parseInt(document.getElementById("mood_input").value) < 1 || parseInt(document.getElementById("mood_input").value) > 10){
        // reset input value 
        document.getElementById("mood_input").value = " "
        moodErrorBanner.removeAttribute("hidden")
        //set timeout for banner
        if(moodErrorBanner.hidden === false){
            setTimeout(() => {moodErrorBanner.setAttribute("hidden", true)}, 5000);
        }
    }else{
        //set mood_num storage and reveal next page
            document.getElementById("mood_num").innerHTML = document.getElementById("mood_input").value
            agendaStorage.innerHTML = agendaDefault.innerHTML
            inputDiv.setAttribute("hidden", true)
            outputDiv.removeAttribute("hidden")
            //check mood_num storage and select playlist
            let moodNumStored = parseInt(document.getElementById("mood_num").innerHTML)
            if(moodNumStored > 7){
                document.getElementById("good_mood").removeAttribute("hidden")
            }if(moodNumStored < 7 && moodNumStored > 3){
                document.getElementById("mood_booster").removeAttribute("hidden")
            }if(moodNumStored < 3){
                document.getElementById("sad_music").removeAttribute("hidden")
            }
}
}


//onclick submit hides the input after storing any value information from the mood meter
document.getElementById("submit").addEventListener("click", checkSelections)


//Meal Prep API

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '25f28ab8camsha873c056abacba3p11c668jsn1474a4876764',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};


//translate recipie API to cards
const createRecipieCard = function (recipies){
    //grab random recipie from array
    let randomRecipie = recipies[getRandomInt(1, 20)]
    console.log(randomRecipie)
    //pull name and place in card
    let recipieName = randomRecipie[1].name
    document.getElementById("recipie_name").innerHTML = recipieName
    //pull img
    let recipieImg = randomRecipie[1].thumbnail_url
    document.getElementById("recipie_image").src = recipieImg
    //pull desc
    let recipieDesc = randomRecipie[1].description
    document.getElementById("recipie_description").innerHTML = recipieDesc
    //pull link
    let recipieLink = randomRecipie[1].original_video_url
    document.getElementById("recipie_link").href = recipieLink 
    //pull credits
    let credits = randomRecipie[1].credits[0].name
    document.getElementById("credits").innerHTML = credits
}

//fetch recipie API
fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options)
	.then(response => response.json())
	.then(data => data)
    //change data into array
    .then(dataObj => Object.entries(dataObj))
    //filter out everything but the recipies themselves
    .then(dataArr => Object.entries(dataArr[1][1]))
    // put a random recipie on a card
    .then(recipies => createRecipieCard(recipies))
	.catch(err => console.error(err));









  