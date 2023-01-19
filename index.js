//date
let date = new Date()
let currentDate = (date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear())

//agenda variables
    let agendaDefault = document.getElementById("agenda_init")
    let agendaErrorBanner = document.getElementById("agenda_error")
    let agendaUl = document.getElementById("agenda_ul")
    let agendaSelections = agendaUl.querySelectorAll("a")
    let agendaDropdown = document.getElementById("dropdown")
//mood variables
    let moodInput = document.getElementById("mood_input")
    let moodNum = moodInput.value
    let moodNumberStorage = document.getElementById("mood_num")
    let moodErrorBanner = document.getElementById("mood_error")
//eventCard variables
    let dateInput = document.getElementById("date_input")
    let eventInput = document.getElementById("event_input")
    let locationInput = document.getElementById("location_input")
    let atendeeInput = document.getElementById("atendee_input")
    let reminderInput = document.getElementById("reminder_input")
    let alternativeInput = document.getElementById("alternative_input")
    let eventTitle = document.getElementById("event_title")
    let eventLocation = document.getElementById("event_location")
    let eventAttendees = document.getElementById("event_atendees")
    let eventReminders = document.getElementById("reminders")
    let eventAlternative = document.getElementById("alternative")
    let eventDate = document.getElementById("event_date")
    

function getRandomInt(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

for (li of agendaSelections) {
    li.addEventListener('click', agendaOptionSelected) 
}

function agendaOptionSelected(){
    let agendaDialogue = this.innerHTML
    agendaDefault.innerHTML = agendaDialogue
    agendaDropdown.removeAttribute("open")
}

agendaDefault.addEventListener("mouseenter", openDropdown)

function openDropdown(){
    agendaDropdown.open = true
}

agendaUl.addEventListener("mouseleave", closeDropdown)

function closeDropdown(){
    agendaDropdown.open = false
}

document.getElementById("mood_meter_card").addEventListener("keydown", enterKeyPress)

function enterKeyPress(e){
    if(e.key === "Enter"){
        console.log("hi")
        handleSelections()
    }
}

document.getElementById("submit").addEventListener("click", handleSelections)

function handleSelections(){
    if(agendaDefault.innerHTML === "What's on the agenda for today?"){
        agendaErrorBanner.removeAttribute("hidden")
            if(agendaErrorBanner.hidden === false){
                setTimeout(() => {agendaErrorBanner.setAttribute("hidden", true)}, 5000);
            }
    }else if(parseInt(moodInput.value) < 1 || parseInt(moodInput.value) > 10){
        moodInput.value = " "
        moodErrorBanner.removeAttribute("hidden")
            if(moodErrorBanner.hidden === false){
                setTimeout(() => {moodErrorBanner.setAttribute("hidden", true)}, 5000);
            }
    }else if(moodInput.value === " "){ 
        moodInput.value = " "
        moodErrorBanner.removeAttribute("hidden")
            if(moodErrorBanner.hidden === false){
                setTimeout(() => {moodErrorBanner.setAttribute("hidden", true)}, 5000);
            }
    }else{
            moodNumberStorage.innerHTML = moodInput.value
            document.getElementById("agenda").innerHTML = agendaDefault.innerHTML
            document.getElementById("input").setAttribute("hidden", true)
            document.getElementById("output").removeAttribute("hidden")
            let moodNumStored = parseInt(moodNumberStorage.innerHTML)
            if(moodNumStored > 7){
                document.getElementById("good_mood").removeAttribute("hidden")
            }if(moodNumStored < 7 && moodNumStored > 3){
                document.getElementById("mood_booster").removeAttribute("hidden")
            }if(moodNumStored < 3){
                document.getElementById("sad_music").removeAttribute("hidden")
            }
    }
}
   
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


function filterRecipies(recipies){
    let recipeArr = recipies.hits
    let randomRecipe = recipeArr[getRandomInt(1, 20)]
    createRecipieCard(randomRecipe)
    }

function createRecipieCard(recipeObj){
        let recipieName = recipeObj.recipe.label
        document.getElementById("recipie_name").innerText = recipieName

        let recipieImg = recipeObj.recipe.images.REGULAR.url
        document.getElementById("recipie_image").src = recipieImg

        let recipieDesc = stringifyIngredients(recipeObj.recipe.ingredients)
        document.getElementById("recipie_description").innerText = recipieDesc

        let recipieLink = recipeObj.recipe.shareAs
        document.getElementById("recipie_link").href = recipieLink 

        let credits = recipeObj.recipe.source
        document.getElementById("credits").innerText = credits 

        const likeHolder = document.createElement("p")
        likeHolder.innerText = 0
        const likeButton = document.createElement("button")
        likeButton.innerText = "Like"
        document.getElementById("recipie_backdrop").append(likeHolder, likeButton)
        likeButton.addEventListener("click", () => likeHolder.innerText ++)
    }

function stringifyIngredients(ingredientArr){
    let stepArr = []
    ingredientArr.forEach(step => stepArr.push(step.text))
    return stepArr.join(", ")  
}

//daily stock advice
fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json")
    .then(response => response.json())
    .then(data => displayStockTransactions(data))

function displayStockTransactions(transArr){
    console.log(transArr[0])
    let todaysTransactions = transArr.filter(transaction => transaction.disclosure_date === currentDate)
    let displayedTransaction = todaysTransactions[0]
    let typeOfTransaction

    if(displayedTransaction === undefined){

        document.getElementById("title").innerText = "No Trades in the House Today"
    }else{
        if(displayedTransaction.type === "sale_full"){
            typeOfTransaction = "Sell"
        }else{
            typeOfTransaction = "Buy"
        }
        document.getElementById("rep_name").innerText = `Representative ${displayedTransaction.representative}`
        document.getElementById("transaction_type").innerText = `Transaction Type: ${typeOfTransaction}`
        document.getElementById("ticker").innerText = `Ticker: ${displayedTransaction.ticker}`
        document.getElementById("amount").innerText = `Amount: ${displayedTransaction.amount}`
    }
}

//eventPlanner json
fetch("http://localhost:3000/upcomingEvents")
    .then(response => response.json())
    .then(data => plannerEventFill(data))


function plannerEventFill(scheduleJson){
    scheduleJson.forEach(event => {
        if(event.id === scheduleJson.length){
            eventTitle.innerText = event.event
            eventLocation.innerText = eventLocation.innerText + " " + event.location
            eventAttendees.innerText = eventAttendees.innerText + " " + event.attendees
            eventReminders.innerText = eventReminders.innerText + " " + event.reminders
            eventAlternative.innerText = eventAlternative.innerText + " " + event.alternative
            eventDate.innerText = eventDate.innerText + " " + event.date
        }
    })
    }

    document.getElementById("planner_submit_all").addEventListener("click", createEventObj)

function createEventObj(e){
    e.preventDefault()
    let eventObj = {  
        "date" : dateInput.value,
        "event": eventInput.value,
        "location": locationInput.value,
        "attendees": atendeeInput.value,
        "reminders": reminderInput.value,
        "alternative": alternativeInput.value,
        }
    updateSchedule(eventObj)
    dateInput.value = ""
    eventInput.value = ""
    locationInput.value = ""
    atendeeInput.value = ""
    reminderInput.value = ""
    alternativeInput.value = ""
}

function updateSchedule(eventObj){
    fetch("http://localhost:3000/upcomingEvents",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventObj)
    })

}
