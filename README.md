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
The big challenge was to translate this code and make it visually playable on one's browser of choice. <br/><br/>

<img width="1097" height="1194" alt="Screenshot 2025-09-17 214645" src="https://github.com/user-attachments/assets/cc3b35fa-a379-4653-a45a-9bf77ddb09ef" />


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
This way in game, it is easy to track which cards are left in the deck by checking the respective "card_suits" available inside the 2d array of the "card_type".

## - game_functions.js
This Javascript file contains all the functions that the game needs to run. It ranges from a wide selection of functions such as starting the game <start_game()>, drawing a card <draw_card()>, playing a card from your own hand <play_card()>, playing a card from the computer's hand <play_card_from_computer()>, etc. <br/>
It also contains the logic that the computer uses to play against the player, and it is this that I mainly want to cover in this description. <br/> <br/>
<img width="1226" height="1148" alt="Screenshot 2025-09-14 231911" src="https://github.com/user-attachments/assets/2821fc30-02cc-4137-99cf-4e843e4ee68a" />

I wanted to create a "dumb" bot, in the sense that, the computer isn't aware of its actions. It will simply follow a script, with a little bit of randomness sprinkled in. <br/><br/>

The computer has always a 2% chance of instantly calling Dutch at the beginning of its turn, regardless of its current hand, unless of course the player already called Dutch.<br/> The computer will then check if its hand is empty. If not, it will check if it can play any cards in its hand before drawing a card. Afterwards it will check again and conclude its turn.<br/> <br/>

It is a rather simple script, and I specifically made it so since it was my first time designing an AI in a gaming environment. <br/><br/>

I was also thinking that I could implement a simple machine learning model so the computer could determine what cards to play, when to call dutch and have memory in regards to the player's cards. <br/>
Perhaps I will implement this ability in the future, or perhaps not. <br/>

## - game_engine.js
This Javascript file contains all the event listeners for the player, which makes the game runnable and playable. <br/>
It also contains the start game function <start_game()> that deals 4 randoms card to the player and the computer respectively. <br/><br/>
<img width="979" height="662" alt="Screenshot 2025-09-17 212202" src="https://github.com/user-attachments/assets/33c454f8-efec-4eac-8f55-36dda149c189" />

My first obstacle when I had to translate my initial "console-only" code to a browser based game was the game loop. <br/>
I couldn't find a way to create the game loop using loops since there were to many inputs that the user could give at anytime.
And so I've settled using event listeners. <br/><br/>

Every pressable button, cards, or interactive prompt has an event listener attached to it. The game basically is ran by the user. <br/>
The computer only plays when the player finishes their turn and then proceeds with its script. <br/>
Finally the game checks whether the computer or the player has called Dutch and concludes the game.

# -- Art --
All the art was done using GIMP (check it out here: https://www.gimp.org/). <br/>
This was my first time experimenting with pixel art and I'm honestly very proud with how these cards came out. <br/> <br/>
<img width="200" height="264" alt="diamonds_ace" src="https://github.com/user-attachments/assets/6921fd73-3138-4902-899a-995f9cb05026" />
<img width="200" height="264" alt="clubs_king" src="https://github.com/user-attachments/assets/db92cd56-4cb0-49ec-b38d-e47441349d22" />
<img width="200" height="264" alt="spades_ten" src="https://github.com/user-attachments/assets/4add34ec-7890-4f89-92bb-a7e91f514301" />
<img width="200" height="264" alt="hearts_jack" src="https://github.com/user-attachments/assets/aa3c4ad5-f02c-4a13-806e-c1bb97a9455b" />

I used a canvas of 50px by 66px that was then upscaled to 200px by 264px. <br/>
There are in total 55 images which includes 52 cards, 2 jokers, and the back side. <br/>
You can check them out in the CARDS folder.

# -- Music --

# -- Retrospective --
