# -- DutchCardGame --
Play here: https://kpytoo.github.io/DutchCardGame/

## - About
This is a project about a card game called "Dutch", it is a game that me and my friends play whenever we have a deck of cards. <br/>
It is a memory style game where each decision and action counts and makes for great moments of fun and sometimes can even turn friends into foes! <br/>
Why is it called Dutch you ask? I honestly have no clue, it was the name I was introduced to whenever I played this game for the first time at my summer job. <br/> <br/>

So I've decided to program this game to test myself and learn something new in the meanwhile.<br/>
I've always wanted to program games so I thought that this would be a great start. <br/>
At the time, I was learning some HTML/CSS/Javascript from The Odin Project (check them out -> https://www.theodinproject.com/) and decided to tackle this project using the latter languages.

## - Making a browser game!
My first attempt, or better yet a "draft", was a simple console variation of the game using only Javascript. <br/>
It was successful and I could play the game on the browser's console with simple inputs as game commands, such as "1", "2", etc. <br/>
This version is still accessible if you visit the "dutch_prototype" branch. <br/>
The big challenge was to translate this code and make it visually playable on one's browser of choice. <br/>

# -- Code --
The main files for this project are the following: <br/>
- index.html <br/>
- style.css <br/>
- game_engine.js <br/>
- game_functions.js <br/>
- game_utils.js <br/>

## - index.html
The HTML file that contains all necessary elements to display the table of the game and the other smallers elements, such as the cards, buttons, etc. <br/>
I've made a big use of divs here because I was trying to arrange every element in a very structural manner so everything looked clean and uncluttered.

## - style.css
The CSS file that contains all the necessary styles used in this project, ranging from colours and alignments to transitions and animations. <br/>
To have a sense of structure I mainly used flexbox as it was so easy to work with, and whenever I had to add elements, it was never a struggle. <br/> <br/>

I've used a lot of animations and transitions throughout the styling of this project to give the user a sense of feedback and provide interesting effects. <br/>
This actually was quite challenging but was also very fun and rewarding whenever I got the hang of it. <br/> <br/>
<img width="616" height="320" alt="Screenshot 2025-09-14 225044" src="https://github.com/user-attachments/assets/917ee242-ca77-4a55-bb16-f596fa07a199" />

Keyframes were especially fun to work with although at times it was rather chaotic. Nonetheless, I've learned a lot whilst playing around with some of these animations. <br/>
There are 17 total animations used in this project, ranging from card flips to drawing and playing animations!

## - game_utils.js
This Javascript file contains all the important variables of the game, the Card constructor, the Computer and Player objects and the deck of cards. <br/> <br/>
<img width="1198" height="1007" alt="Screenshot 2025-09-14 230615" src="https://github.com/user-attachments/assets/8c1aa823-8aa4-4bbe-8fcc-9073b2ab010e" />
Starting off with the cards, I've decided to label them each by their own constant variable. Each is a 2d array containing its respective information. <br/>
The format is as follows: const <card_type> = [[card_type], [card_suits], [card_point, card_ability]] <br/> <br/>

The deck is a 1d array of all these constant values. <br/>
This way in game, it is easy to track which cards are left in the deck by checking the respective "card_suits" available inside the 2d of the "card_type".
## - game_functions.js

## - game_engine.js

# -- Art --

# -- Music --

# -- Retrospective --
