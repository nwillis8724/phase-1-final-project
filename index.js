
//hides the input after storing any value information from the mood meter

const hideInput = function (){
    let input = document.getElementById("input")
    let moodStorage = document.getElementById("mood_num")
    let moodInput = document.getElementById('mood_input').value
    moodStorage.innerText = moodInput
    input.setAttribute("hidden", true)
}
document.getElementById("submit").addEventListener("click", hideInput)
