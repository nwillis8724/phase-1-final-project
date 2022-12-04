# Dani-O-Meter

## Overview
The Dani-O-Meter is a web app that started as a joke between my fiance and I when I joined a coding bootcamp. It still contains a lot of the satire you see in a long-term relationship but I do think it could help those indecisive people in our lives. It asks for a few different things, what kind of mood you are feeling today, your general location, and what activities you enjoy. In turn it will display the appropriate options to take the day on.

# Functions
The Dani-O-Meter will have an assortment of functions, the hope is that they all intermingle to make one final product. I imagine that most of these things will change substantially, if not entirely. 

Everything after the three manual imputs will be influenced by whatever has been inputted. perhaps some sort of hide/unhide event after submitting all three will hide the "input" section and show the "Output" section


## Inputs

Weather API
    We will be accessing a Weather API to dictate a lot of the options on the page, for example if its raining it will advise an umbrella for the outfit plan

Mood meter
    Utilizing a drop down bar between 1-10 will help the system figure out what general paths to take. for now it will be fairly straight forward - but perhaps we can implement a push system that gives us less motivated individuals a bit extra motivation on those 1 days.

The days vibe
    Productivity level drop-down with string type inputs that range from lazy day to get it done day. As we all know, mood does not decide whether or not we have to go to work... unfortunately.



## Outputs

Meal Plan
    There is an API attatched to a display card that cycles through recipies so you can try something new every now and again. Supplies a link for indepth instruction/bookmarking

Clothes(not yet implemented)
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
