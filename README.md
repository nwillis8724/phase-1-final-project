# Dani-O-Meter

## Overview
The Dani-O-Meter is a web app that started as a joke between my fiance and I when I joined a coding bootcamp. I think it could help us indecisive people in our lives. It asks for a few different things, and in turn it will display the appropriate options to take the day on.

# Functions
The Dani-O-Meter will have an assortment of functions, the hope is that they all intermingle to make one final product. I imagine that most of these things will change substantially, if not entirely. 

Eventually, most things after the manual inputs will be influenced by whatever has been inputted. The mood and day productivity levels are first inputted, and then hidden to be replaced by the things it has influenced without refreshing the page. There is currently a recipe API, a local json for upcoming events, stock exchange information, and a playlist based on your mood.


## Inputs

Weather API
    We will be accessing a Weather API to hopefully dictate some options on the page in the future, for example if its raining it will advise an umbrella for the outfit plan

Mood meter
    Utilizing an inputted number between 1-10 will help the system figure out what general paths to take. For now it will be fairly straight forward - but I plan to implement some more interactivity with this function.

The days vibe
    Productivity level drop-down with string type inputs that range from lazy day to get it done day. As we all know, mood does not decide whether or not we have to go to work... unfortunately.



## Outputs

Recpipies
    There is an API attatched to a display card that cycles through recipies so you can try something new every now and again. Supplies a link for indepth instruction/bookmarking

Outfits(not yet implemented)
    What to wear. I'm thinking we use a JSON to store a few outfits and even add a submit form to add to the JSON, seperated top(head and torso), bottom(pants), and shoes(shoes)

Social Expectations
    The page displays a card with your most recently added event. Will give you reminders based on date, activities and attendees.

Songs
   Depending on mood input, a playlist will show up on the page.

Any upcoming events 
    Manually input any sort of event you have upcoming and the page will remind you what ever the latest event is on the page.

# Credits

Thank you to weatherwidget.io for the... weather widget

src = https://weatherwidget.io/

Thank you Smashing Magazine for creating  header style I used

src = https://codepen.io/smashing-magazine/pen/dyzPQor

Thank you Garet McKinley for the drop down menu style I used

src = https://codepen.io/garetmckinley/pen/XvgzKQ

Thank you Soufiane Khalfaoui HaSsani for the form style i used

src = https://codepen.io/soufiane-khalfaoui-hassani/pen/LYpPWda

Thank you BBBootstrap Team, @bbbootstrap62244, for the error alert styles i used

src = https://bbbootstrap.com/snippets/bootstrap-messages-alerts-58736812

Thank you to Edamam for their recipie API!

src = https://api.edamam.com/api/recipes/v2?type=public&beta=false&app_id=11fd9927&app_key=82ce8e31088f48974a06cda967e986ce&diet=balanced&imageSize=REGULAR&random=true
