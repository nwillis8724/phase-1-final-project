//ask about the html command that does this
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded');
})

//different variables
let agendaDefault = document.getElementById("agenda_init")
let agendaErrorBanner = document.getElementById("agenda_error")
let moodErrorBanner = document.getElementById("mood_error")
let inputDiv = document.getElementById("input")
let agendaSelections = document.getElementById("agenda_ul").querySelectorAll("a")
let moodNum = document.getElementById("mood_input").value
let moodInput = document.getElementById("mood_input")
let outputDiv = document.getElementById("output")
let dropdown = document.getElementById('dropdown')
//create random number
function getRandomInt(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

// create an onclick event for each agenda option
for (li of agendaSelections) {
    li.addEventListener('click', agendaOptionSelected) 
  }

//make agenda open with hover
agendaDefault.addEventListener("mouseover", openDropdown)

function openDropdown(){
    dropdown.open = true
}
//close agenda on click
window.addEventListener('click', closeDropdown)

function closeDropdown(){
    dropdown.open = false
}

//captures innerHML of agenda selections, replaces default and dropbar dismissed
function agendaOptionSelected(){
    let agendaDialogue = this.innerHTML
    agendaDefault.innerHTML = agendaDialogue
    document.getElementById("dropdown").removeAttribute("open")
}


//onclick submit hides the input after storing any value information from the mood meter
document.getElementById("submit").addEventListener("click", initiateSelections)
//do the same thing for enter keypress
window.addEventListener("keypress", enterKeyPress)
//if the enter key is clicked initiate selections
function enterKeyPress(e){
    if(e.key === "Enter"){
        initiateSelections()
    }
}
//check and store selections/inputs
function initiateSelections(){
    let agendaStorage = document.getElementById("agenda")
    //see if agenda selection has been made
    if(agendaDefault.innerHTML === "What's on the agenda for today?"){
        //activate agenda error banner
        agendaErrorBanner.removeAttribute("hidden")
        if(agendaErrorBanner.hidden === false){
            setTimeout(() => {agendaErrorBanner.setAttribute("hidden", true)}, 5000);
        }
    // check if the value is less than 1 or greater than 10
    }else if(parseInt(document.getElementById("mood_input").value) < 1 || parseInt(document.getElementById("mood_input").value) > 10){
        // reset input value 
        document.getElementById("mood_input").value = " "
        //activate mood error banner
        moodErrorBanner.removeAttribute("hidden")
        if(moodErrorBanner.hidden === false){
            setTimeout(() => {moodErrorBanner.setAttribute("hidden", true)}, 5000);
        }
    //check if input is n/a
    }else if(document.getElementById("mood_input").value === ''){
        moodErrorBanner.removeAttribute("hidden")
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

//or input event listener for the input inside mood meter


//fetch recipie API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '25f28ab8camsha873c056abacba3p11c668jsn1474a4876764',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options)
	.then(response => response.json())
    .then(data => filterRecipies(data.results))


function filterRecipies(recipie){
    let describedRecipies = []
    recipie.forEach(item => {
        if(item.description !== ""){
            describedRecipies.push(item)
        }
    })
    createRecipieCard(describedRecipies)
}
    
function createRecipieCard(recipies){
    //grab random recipie from array
        let randomRecipie = recipies[getRandomInt(1, 17)]
        console.log(randomRecipie)
    //pull name and place in card
        let recipieName = randomRecipie.name
        document.getElementById("recipie_name").innerHTML = recipieName
    //pull img
        let recipieImg = randomRecipie.thumbnail_url
        document.getElementById("recipie_image").src = recipieImg
    //pull desc
        let recipieDesc = randomRecipie.description
        document.getElementById("recipie_description").innerHTML = recipieDesc
    //pull link
        let recipieLink = randomRecipie.original_video_url
        document.getElementById("recipie_link").href = recipieLink 
    //pull credits
        let credits = randomRecipie.credits[0].name
        document.getElementById("credits").innerHTML = credits
    }
    

//shorten thens and incorperate a .filter
//foreach on instructions



  