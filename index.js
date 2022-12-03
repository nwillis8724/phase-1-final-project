//ask about the html command that does this
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded');
})

//different variables
    let date = new Date()
    let currentDate = (date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear())
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)
    let tomorrowDate = (tomorrow.getMonth() + '/' + tomorrow.getDate() + '/' + tomorrow.getFullYear())
    let agendaDefault = document.getElementById("agenda_init")
    let agendaErrorBanner = document.getElementById("agenda_error")
    let moodErrorBanner = document.getElementById("mood_error")
    let inputDiv = document.getElementById("input")
    let agendaSelections = document.getElementById("agenda_ul").querySelectorAll("a")
    let moodNum = document.getElementById("mood_input").value
    let moodInput = document.getElementById("mood_input")
    let outputDiv = document.getElementById("output")
    let dropdown = document.getElementById('dropdown')
    let eventInputs = document.getElementById("upcoming_event_input").querySelectorAll("input")

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


//on click submit button hides the input after storing any value information from the mood meter
    document.getElementById("submit").addEventListener("click", initiateSelections)
//do the same thing for enter keypress //detatch from window, keeps working on 2nd page//
    window.addEventListener("keydown", enterKeyPress)
//if the enter key is clicked initiate selections
    function enterKeyPress(e){
        if(e.key === "Enter"){
            initiateSelections()
        }
    }
//check and store selections/inputs
    function initiateSelections(){
        let agendaStorage = document.getElementById("agenda")
        //check if agenda selection has been made
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

//Recipe API

fetch("https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=11fd9927&app_key=82ce8e31088f48974a06cda967e986ce&diet=balanced&imageSize=REGULAR&random=true", {
    method: "GET",   
    headers: {
            "cache-control": "private",
            "connection": "keep-alive",
            "content-length": "193",
            "content-type": "application/json",
            "date": "Sat, 03 Dec 2022 18:29:28 GMT",
            "expires": "Thu, 01 Jan 1970 00:00:00 GMT",
            "server": "openresty",
            "strict-transport-security": "max-age=15552001",
            "x-envoy-upstream-service-time": "190",
            "x-served-by": "ip-10-0-1-87.ec2.internal/10.0.1.87"
    }
})
    .then(response => response.json())
    .then(recipies => filterRecipies(recipies))

//filter recipe to one random recipe object
    function filterRecipies(recipies){
        let recipeArr = recipies.hits
        let randomRecipe = recipeArr[getRandomInt(1, 21)]
        console.log(randomRecipe.recipe.ingredients)
        createRecipieCard(randomRecipe)
        }
//take filtered recipe and turn it into a card
    function createRecipieCard(recipeObj){
        //pull name and place in card
            let recipieName = recipeObj.recipe.label
            document.getElementById("recipie_name").innerText = recipieName
        //pull img
            let recipieImg = recipeObj.recipe.images.REGULAR.url
            document.getElementById("recipie_image").src = recipieImg
        //pull desc
            let recipieDesc = stringifyIngredients(recipeObj.recipe.ingredients)
            document.getElementById("recipie_description").innerText = recipieDesc
        //pull link
            let recipieLink = recipeObj.recipe.shareAs
            document.getElementById("recipie_link").href = recipieLink 
        //pull credits
            let credits = recipeObj.recipe.source
            document.getElementById("credits").innerText = credits
        }

//turn ingredients into a string
    function stringifyIngredients(ingredientArr){
        let stepArr = []
        ingredientArr.forEach(step => stepArr.push(step.text))
        return stepArr.join(", ")  
    }

// //daily stock advice
//     fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json")
//         .then(response => response.json())
//         .then(data => displayStockTransactions(data))

    function displayStockTransactions(transArr){
        //get transactions from the day of using todays date and a filter method
        let todaysTransactions = transArr.filter(transaction => transaction.disclosure_date === currentDate)
        let displayedTransaction = todaysTransactions[0]
        let typeOfTransaction
        if(displayedTransaction.type === "sale_full"){
            typeOfTransaction = "Sell"
        }else{
            typeOfTransaction = "Buy"
        }
        console.log(displayedTransaction)
        document.getElementById("rep_name").innerText = `Representative ${displayedTransaction.representative}`
        document.getElementById("transaction_type").innerText = `Transaction Type: ${typeOfTransaction}`
        document.getElementById("ticker").innerText = `Ticker: ${displayedTransaction.ticker}`
        document.getElementById("amount").innerText = `Amount: ${displayedTransaction.amount}`
    }


//planner
fetch("http://localhost:3000/upcomingEvents")
    .then(response => response.json())
    .then(data => plannerEventFill(data))

// fill planner events

function plannerEventFill(scheduleJson){
    scheduleJson.forEach(event => {
        if(event.id === scheduleJson.length){
            document.getElementById("event_title").innerText = event.event
            document.getElementById("event_location").innerText = event.location
            document.getElementById("event_atendees").innerText = event.attendees
            document.getElementById("reminders").innerText = event.reminders
            document.getElementById("alternative").innerText = event.alternative
        }
    })
    }



//event listener for every input on planner card. deletes default input
for (input of eventInputs) {
    input.addEventListener('click', clearDefault) 
}

function clearDefault(){
   return this.value = ""
}