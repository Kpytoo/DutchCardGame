//Card Class
class Card {
    constructor(card_type, card_suit, card_point, card_ability){
        this.card_type = card_type;
        this.card_suit = card_suit;
        this.card_point = card_point;
        this.card_ability = card_ability;
    };
};

//Create cards (2d arrays) [[card_type], [card_suit], [card_point, card_ability]]
const ACE = [["ace"],["hearts","diamonds","spades","clubs"], [1, "no_ability"]];      //Card type 0
const TWO = [["two"],["hearts","diamonds","spades","clubs"], [2, "no_ability"]];      //Card type 1
const THREE = [["three"],["hearts","diamonds","spades","clubs"], [3, "no_ability"]];  //Card type 2
const FOUR = [["four"],["hearts","diamonds","spades","clubs"], [4, "no_ability"]];    //Card type 3
const FIVE = [["five"],["hearts","diamonds","spades","clubs"], [5, "no_ability"]];    //Card type 4
const SIX = [["six"],["hearts","diamonds","spades","clubs"], [6, "no_ability"]];      //Card type 5
const SEVEN = [["seven"],["hearts","diamonds","spades","clubs"], [7, "look_self"]];   //Card type 6
const EIGHT = [["eight"],["hearts","diamonds","spades","clubs"], [8, "look_opp"]];    //Card type 7
const NINE = [["nine"],["hearts","diamonds","spades","clubs"], [9, "no_ability"]];    //Card type 8
const TEN = [["ten"],["hearts","diamonds","spades","clubs"], [10, "switch"]];         //Card type 9
const JACK = [["jack"],["hearts","diamonds","spades","clubs"], [10, "no_ability"]];   //Card type 10
const QUEEN = [["queen"],["hearts","diamonds","spades","clubs"], [10, "no_ability"]]; //Card type 11
const KING_RED = [["king"],["hearts","diamonds"], [-3, "no_ability"]];                //Card type 12
const KING_BLACK = [["king"],["spades","clubs"], [13, "no_ability"]];                 //Card type 13
const JOKER = [["joker"],["red","black"], [0, "no_ability"]];                         //Card type 14

//Create a deck of 54 cards (15 types of cards)
const deck_of_cards = [
    ACE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING_RED,
    KING_BLACK,
    JOKER
];

//Create computer object
const computer = {
    hand: [], //Actual hand of the computer
    known_hand: [], //Known hand by the computer, meaning only the cards that are revealed
    num_of_cards: 0, //Number of cards
    dutch: false, //If dutch was called
};

//Create player object
const player = {
    hand: [], //Actual hand of the player
    num_of_cards: 0, //Number of cards
    dutch: false, //If dutch was called
};

//Function that returns the remaining amount of cards in the deck
const num_of_cards_in_deck = () => {
    let total = 0;
    for(let i = 0; i < deck_of_cards.length; i++){
        total += deck_of_cards[i][1].length;
    }
    return total;
};

//This function returns a random number between 0 and max_num
const random_number = (max_num) => {
    return Math.floor(Math.random() * max_num);
};

//This function gives 4 random cards to the computer and the player at the start of the game
const start_game = () => {
    while(true){ //Loop function to draw cards until condition below is met
        if (computer.num_of_cards == 4 && player.num_of_cards == 4){//Checks if the computer and the player have 4 cards
            break; //Break from the while loop
        } 
        else{//If both the computer and player don't have 4 cards, give them cards!!!
            let chosen_card_index = random_number(deck_of_cards.length); //Generate a random number to get a random card type
            let chosen_card = deck_of_cards[chosen_card_index]; //Retrieve a random card from the deck

            if(chosen_card[1].length != 0){ //If suits of the chosen card are still available in the deck
                let card_type = chosen_card[0][0]; //Retrieve the card type
                let card_suit_index = random_number(chosen_card[1].length); //Generate a random number to get a random card suit
                let card_suit = chosen_card[1][card_suit_index]; //Retrieve the suit of the card type, or color if it's a joker (card type 14)
                let card_point = chosen_card[2][0]; //Retrieve the point of the chosen card
                let card_ability = chosen_card[2][1]; //Retrieve the ability, if any, of the chosen card
                chosen_card[1].splice(card_suit_index, 1); //Removes the card suit from the card 2d array

                if(computer.num_of_cards < 4){ //Give the computer 4 random cards
                    computer.hand.push(new Card(card_type, card_suit, card_point, card_ability)); //Create a card object using the card type and card suit and add it to their hand
                    if(computer.num_of_cards < 2){
                        computer.known_hand.push(new Card(undefined, undefined, undefined, undefined)); //The first 2 cards, the computer doesn't know about them
                    }
                    else{
                        computer.known_hand.push(new Card(card_type, card_suit, card_point, card_ability)); //The last 2 cards, the computer DOES know about them
                    }
                    computer.num_of_cards++; //Increment the number of cards in the computer's hand
                }
                else if(player.num_of_cards < 4){ //Give the player 4 random cards
                    player.hand.push(new Card(card_type, card_suit, card_point, card_ability)); //Create a card object using the card type and card suit and add it to their hand
                    player.num_of_cards++; //Increment the number of cards in the player's hand
                }
            }
            else { //If there are no more suits of the random card type (all suits of that card were drawn)
                deck_of_cards.splice(chosen_card_index, 1); //Remove the card type from the deck (because all suits of that card were drawn)
            }
        }
    } //End while loop

    //Display starting hand to player (reveals only 2 cards)
    for(let i = 0; i < player.num_of_cards; i++){
        if(i < 2){
            console.log("-----\n|CARD "+ (i+1) +"|\n-----");
        }
        else{
            console.log("-----\n|"+player.hand[i].card_type+"|\n|"+player.hand[i].card_suit+"|\n-----\n"+
                        "Points: "+player.hand[i].card_point+"\n"+
                        "Ability: "+player.hand[i].card_ability); 
        }
    }
};

//Function that displays the hand of the computer and the player (all cards face up) (Used only at the end of the game to reveal all the cards)
const display_full_hand = (computer, player, pile) => {
    //Display the computer's hand
    console.log("******** COMPUTER'S HAND ******** "+"num_of_cards: " + computer.num_of_cards + " length: " + computer.hand.length);
    for(let i = 0; i < computer.num_of_cards; i++){
        console.log("-----\n|"+computer.hand[i].card_type+"|\n|"+computer.hand[i].card_suit+"|\n-----\n"+
        "Points: "+computer.hand[i].card_point+"\n"+
        "Ability: "+computer.hand[i].card_ability); 
    }
    //Display the pile
    if(pile.card_type == undefined){
        console.log(">>>>>>>> PILE CARD <<<<<<<< (Cards in deck: " + num_of_cards_in_deck()+")\nEMPTY");
    }
    else{
        console.log(">>>>>>>> PILE CARD <<<<<<<< (Cards in deck: " + num_of_cards_in_deck() + ")");
        console.log("-----\n|"+pile.card_type+"|\n|"+pile.card_suit+"|\n-----\n"+
        "Points: "+pile.card_point+"\n"+
        "Ability: "+pile.card_ability);
    }
    //Display the player's hand
    console.log("******** PLAYER'S HAND ******** "+"num_of_cards: " + player.num_of_cards + " length: " + player.hand.length)
    for(let i = 0; i < player.num_of_cards; i++){
        console.log("-----\n|"+player.hand[i].card_type+"|\n|"+player.hand[i].card_suit+"|\n-----\n"+
        "Points: "+player.hand[i].card_point+"\n"+
        "Ability: "+player.hand[i].card_ability); 
    }
    console.log("#########################################################################################");
};

//Function that displays the hand of the computer and the player (all cards face down) (Used during the game)
const display_hidden_hand = (computer, player, pile) => {
    //Display the computer's hand
    console.log("******** COMPUTER'S HAND ********")
    for(let i = 0; i < computer.num_of_cards; i++){
        console.log("-----\n|CARD "+ (i+1) +"|\n-----");; 
        
    }
    //Display the pile
    if(pile.card_type == undefined){
        console.log(">>>>>>>> PILE CARD <<<<<<<<\n"+"EMPTY");
    }
    else{
        console.log(">>>>>>>> PILE CARD <<<<<<<<")
        console.log("-----\n|"+pile.card_type+"|\n|"+pile.card_suit+"|\n-----\n"+
        "Points: "+pile.card_point+"\n"+
        "Ability: "+pile.card_ability);
    }
    
    //Display the player's hand
    console.log("******** PLAYER'S HAND ********")
    for(let i = 0; i < player.num_of_cards; i++){
        console.log("-----\n|CARD "+ (i+1) +"|\n-----"); 
    }
    console.log("#########################################################################################");
};

//Function that draws a card for a user (computer or player)
//Takes a card object as input
const draw_card = (drawn_card) => {

    if(deck_of_cards.length != 0){ //If the deck isn't empty
        while(deck_of_cards.length != 0){
            let chosen_card_index = random_number(deck_of_cards.length); //Generate a random number to get a random card type
            let chosen_card = deck_of_cards[chosen_card_index]; //Retrieve a random card from the deck
            if(chosen_card[1].length != 0){ //If suits of the chosen card are still available in the deck 
                let card_type = chosen_card[0][0]; //Retrieve the card type
                let card_suit_index = random_number(chosen_card[1].length); //Generate a random number to get a random card suit
                let card_suit = chosen_card[1][card_suit_index]; //Retrieve the suit of the card type, or color if it's a joker (card type 14)
                let card_point = chosen_card[2][0]; //Retrieve the point of the chosen card
                let card_ability = chosen_card[2][1]; //Retrieve the ability, if any, of the chosen card
                chosen_card[1].splice(card_suit_index, 1); //Removes the card suit from the card 2d array
                drawn_card.card_type = card_type;
                drawn_card.card_suit = card_suit;
                drawn_card.card_point = card_point;
                drawn_card.card_ability = card_ability;
                break;
            }
            else { //If there are no more suits of the random card type (all suits of that card were drawn)
                deck_of_cards.splice(chosen_card_index, 1); //Remove the card type from the deck (because all suits of that card were drawn)
            }
        }
    }
    else {
        alert("Deck is empty! Game finished. Reveal your cards!");
    }
};

//Function that switches one card from the user's hand with the drawn card, and plays the switched card
const switch_card = (user, drawn_card, pile) => {
    if(user == computer){ //If the computer calls the function
        alert("Computer is switching!");
        let random_card = random_number(user.hand.length);
        let switched_card = new Card(user.hand[random_card].card_type, //Get the card from the user's hand that will be switched
                                     user.hand[random_card].card_suit,
                                     user.hand[random_card].card_point,
                                     user.hand[random_card].card_ability);
        //Assign the drawn card to the actual hand  
        user.hand[random_card].card_type = drawn_card.card_type;
        user.hand[random_card].card_suit = drawn_card.card_suit;
        user.hand[random_card].card_point = drawn_card.card_point;
        user.hand[random_card].card_ability = drawn_card.card_ability;
        //Assign the drawn card to the known hand
        user.known_hand[random_card].card_type = drawn_card.card_type;
        user.known_hand[random_card].card_suit = drawn_card.card_suit;
        user.known_hand[random_card].card_point = drawn_card.card_point;
        user.known_hand[random_card].card_ability = drawn_card.card_ability;
        play_card_on_pile(user, switched_card, pile, false); //Play the switched card   
    }
    else{ //If user calls the function
        while(true){ //The player is being prompted until a correct action is taken
            let card_number = +String(prompt("You drew a \n-----\n|"+drawn_card.card_type+"|\n|"+drawn_card.card_suit+"|\n-----\n"+
                    "Points: "+drawn_card.card_point+"\n"+
                    "Ability: "+drawn_card.card_ability+"\n"+
                    "\n----- Choose which card you would like to switch -----\n"+
                    "(Enter the card number)\n"));
            if(Number.isNaN(card_number)){ //Check if user entered a number
                alert("Please enter a number!");
            }
            else if(card_number > user.hand.length){ //Check if user entered a number above the total of their hand
                alert("You only have "+user.hand.length+" cards, "+card_number+" is too high!");
            }
            else if(card_number < 1){ //Check if user entered a number below 1
                alert("Please choose a number above 0! (There's no CARD "+card_number+")");
            }
            else{
                let switched_card = new Card(user.hand[card_number-1].card_type, //Get the card from the user's hand that will be switched
                                             user.hand[card_number-1].card_suit,
                                             user.hand[card_number-1].card_point,
                                             user.hand[card_number-1].card_ability); 
                alert("You switched a "+ switched_card.card_type +" "+ switched_card.card_suit+
                    " with a "+ drawn_card.card_type +" "+ drawn_card.card_suit);   
                user.hand[card_number-1].card_type = drawn_card.card_type;
                user.hand[card_number-1].card_suit = drawn_card.card_suit;
                user.hand[card_number-1].card_point = drawn_card.card_point;
                user.hand[card_number-1].card_ability = drawn_card.card_ability;
                play_card_on_pile(user, switched_card, pile, false); //Play the switched card    
                break;
            }
        }
    }
};

//Function that plays a card by placing it on the pile and using its ability
// played_by_opp (bool val) --> if it was played by the opponent, if yes, don't use the abilities
const play_card_on_pile = (user, card, pile, played_by_opp) => {
    //Switch the pile card with the played card
    alert(card.card_type + " of " + card.card_suit + " was played!");
    pile.card_type = card.card_type;
    pile.card_suit = card.card_suit;
    pile.card_point = card.card_point;
    pile.card_ability = card.card_ability;

    if(played_by_opp != true){ //If the opponent didn't play your card, or vice versa
        if(user == player){ //If the user is playing the card.
            if(card.card_type == "seven"){ //If the player is playing a seven.
                if(!(user.num_of_cards == 0)){ //Check if user's hand isn't empty
                    while(true){ //Make sure the user is entering a valid number
                        let peek_card_number = +String(prompt("You've played a seven!\n----- Choose which card you would like to take a peek -----\n"+
                                                    "(Enter the card number)\n"));
                        if(Number.isNaN(peek_card_number)){ //Check if user entered a number
                            alert("Please enter a number!");
                        }
                        else if(peek_card_number > user.hand.length){ //Check if user entered a number above the total of their hand
                            alert("You only have "+user.hand.length+" card(s), "+peek_card_number+" is too high!");
                        }
                        else if(peek_card_number < 1){ //Check if user entered a number below 1
                            alert("Please choose a number above 0! (There's no CARD "+peek_card_number+")");
                        }
                        else{ //If the user enters a valid number
                            let peek_card = user.hand[peek_card_number-1] //Retrieve the card the user wants to look at
                            alert("Card "+ peek_card_number +" is a:\n"+
                                "-----\n|"+peek_card.card_type+"|\n|"+peek_card.card_suit+"|\n-----\n"+
                                "Points: "+peek_card.card_point+"\n"+
                                "Ability: "+peek_card.card_ability+"\n")
                            break;
                        }    
                    }    
                }
                else{
                    alert("You've played a seven!\n Can't peek if you have no more cards in hand!");
                }
            }
            else if(card.card_type == "eight"){ //If the player is playing an eight.
                if(!(computer.num_of_cards == 0)){ //Check if computer's hand isn't empty
                    while(true){ //Make sure the user is entering a valid number
                        let peek_card_number = +String(prompt("You've played an eight!\n----- Choose which card you would like to take a peek from the computer's hand -----\n"+
                                                    "(Enter the card number)\n"));
                        if(Number.isNaN(peek_card_number)){ //Check if user entered a number
                            alert("Please enter a number!");
                        }
                        else if(peek_card_number > computer.hand.length){ //Check if user entered a number above the total of the computer's hand
                            alert("The computer only has "+computer.hand.length+" card(s), "+peek_card_number+" is too high!");
                        }
                        else if(peek_card_number < 1){ //Check if user entered a number below 1
                            alert("Please choose a number above 0! (There's no CARD "+peek_card_number+")");
                        }
                        else{ //If the user enters a valid number
                            let peek_card = computer.hand[peek_card_number-1] //Retrieve the card the user wants to look at
                            alert("Card "+ peek_card_number +" is a:\n"+
                                "-----\n|"+peek_card.card_type+"|\n|"+peek_card.card_suit+"|\n-----\n"+
                                "Points: "+peek_card.card_point+"\n"+
                                "Ability: "+peek_card.card_ability+"\n")
                            break;
                        }    
                    }    
                }
                else{
                    alert("You've played an eight!\n Can't peek if the computer has no more cards in its hand!");
                }
            }
            else if(card.card_type == "ten"){ //If the player is playing a ten.
                if(!(computer.num_of_cards == 0)){ //Check if computer's hand isn't empty
                    if(!(player.num_of_cards == 0)){ //Also check if the player's hand isn't empty
                        while(true){ //Make sure the user is entering a valid number
                            let player_choice = +String(prompt("You've played a ten!\n----- Would you like to switch a card with the computer? -----\n"+
                                                        "(Enter a number)\n"+
                                                        "1. Yes\n"+
                                                        "2. No"));
                            if(Number.isNaN(player_choice)){ //Check if user entered a number
                                alert("Please enter a number!");
                            }
                            else if(player_choice == 1){ //If the player decides to switch a card with the computer.
                                while(true){ //Make sure the user is entering a valid number
                                    let user_card_number = +String(prompt("----- Which card would you like to switch from your hand? -----\n"+
                                                                        "(Enter the card number)\n"));
                                    if(Number.isNaN(user_card_number)){ //Check if user entered a number
                                        alert("Please enter a number!");
                                    }
                                    else if(user_card_number > user.hand.length){ //Check if user entered a number above the total of their hand
                                        alert("You only have "+user.hand.length+" cards, "+user_card_number+" is too high!");
                                    }
                                    else if(user_card_number < 1){ //Check if user entered a number below 1
                                        alert("Please choose a number above 0! (There's no CARD "+user_card_number+")");
                                    }
                                    else{ //If the user enters a valid number
                                        while(true){ //Make sure the user is entering a valid number
                                            let computer_card_number = +String(prompt("----- Which card would you like to switch with the computer? -----\n"+
                                                                                "(Enter the card number)\n"));
                                            if(Number.isNaN(computer_card_number)){ //Check if user entered a number
                                                alert("Please enter a number!");
                                            }
                                            else if(computer_card_number > computer.hand.length){ //Check if user entered a number above the total of the computer's hand
                                                alert("The computer has "+computer.hand.length+" cards, "+computer_card_number+" is too high!");
                                            }
                                            else if(computer_card_number < 1){ //Check if user entered a number below 1
                                                alert("Please choose a number above 0! (There's no CARD "+computer_card_number+")");
                                            }
                                            else{ //If the user enters a valid number
                                                alert("Switching.....");
                                                alert("You've switched a "+ player.hand[user_card_number-1].card_type + " " + player.hand[user_card_number-1].card_suit
                                                    +" with a "+ computer.hand[computer_card_number-1].card_type + " " + computer.hand[computer_card_number-1].card_suit);

                                                let placeholder_card = new Card(player.hand[user_card_number-1].card_type, //Make a place holder card during the switch.
                                                                                player.hand[user_card_number-1].card_suit,
                                                                                player.hand[user_card_number-1].card_point,
                                                                                player.hand[user_card_number-1].card_ability);
                                                
                                                //Assign to the player's card the computer's card
                                                player.hand[user_card_number-1].card_type = computer.hand[computer_card_number-1].card_type;
                                                player.hand[user_card_number-1].card_suit = computer.hand[computer_card_number-1].card_suit;
                                                player.hand[user_card_number-1].card_point = computer.hand[computer_card_number-1].card_point;
                                                player.hand[user_card_number-1].card_ability = computer.hand[computer_card_number-1].card_ability;

                                                //Assign to the computer's card the placeholder_card (player card)
                                                //**For the known hand, we assign undefined because the computer won't know its new changed card.
                                                computer.hand[computer_card_number-1].card_type = placeholder_card.card_type;
                                                computer.hand[computer_card_number-1].card_suit = placeholder_card.card_suit;
                                                computer.hand[computer_card_number-1].card_point = placeholder_card.card_point;
                                                computer.hand[computer_card_number-1].card_ability = placeholder_card.card_ability;
                                                computer.known_hand[computer_card_number-1].card_type = undefined;
                                                computer.known_hand[computer_card_number-1].card_suit = undefined;
                                                computer.known_hand[computer_card_number-1].card_point = undefined;
                                                computer.known_hand[computer_card_number-1].card_ability = undefined;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                }
                                break;
                            }
                            else if(player_choice == 2){ //Do nothing if the player doesn't want to switch.
                                break;
                            }
                            else{ //Ask the player to enter a proper number (1 or 2).
                                alert("Please enter a proper action!");
                            }    
                        }
                    }
                    else{ //Can't switch cards after playing a ten if the player has no cards in hand.
                        alert("You've played a ten!\n Can't switch cards if you don't have anymore cards in your hand!")
                    }   
                }
                else{ //Can't switch cards after playing a ten if the computer has no cards in hand.
                    alert("You've played a ten!\n Can't switch cards if the computer has no more cards in its hand!");
                }
            }
            else{} //Else do nothing
        }
        else{ //If the computer is playing the card.
            if(card.card_type == "seven"){ //If the computer is playing a seven.
                alert("seven was used by the computer");
                if(computer.num_of_cards != 0){//If the computer's hand isn't empty
                    for(let card_index = 0; card_index < computer.num_of_cards; card_index++){ //Check for cards that are unknown to the comp in the known hand (values are undefined)
                        if(computer.known_hand[card_index].card_type == undefined){ //If found, make the card known to the card computer
                            alert(card_index + " " + computer.known_hand[card_index].card_type + " " + computer.known_hand[card_index].card_suit);
                            computer.known_hand[card_index].card_type = computer.hand[card_index].card_type;
                            computer.known_hand[card_index].card_suit = computer.hand[card_index].card_suit;
                            computer.known_hand[card_index].card_point = computer.hand[card_index].card_point;
                            computer.known_hand[card_index].card_ability = computer.hand[card_index].card_ability;
                            alert(card_index + " " + computer.known_hand[card_index].card_type + " " + computer.known_hand[card_index].card_suit);
                            break; //Break out of the for loop
                        }
                    }
                }
            }
            else if(card.card_type == "eight"){ //If the computer is playing an eight, it doesn't do anything --- dumb computer :(
                alert("eight was used by the computer, nothing happens :(");
                
            }
            else if(card.card_type == "ten"){ //If the computer is playing a ten.
                alert("ten was used by the computer");
                if(!(player.num_of_cards == 0)){ //Check if the player's hand isn't empty
                    if(!(computer.num_of_cards == 0)){ //also check if computer's hand isn't empty
                        let player_card_index = random_number(player.num_of_cards); //Get a random index based on the player's hand
                        let computer_card_index = random_number(computer.num_of_cards); //Get a random index based on the computer's hand

                        let placeholder_card = new Card(player.hand[player_card_index].card_type, //Make a place holder card during the switch.
                                                        player.hand[player_card_index].card_suit,
                                                        player.hand[player_card_index].card_point,
                                                        player.hand[player_card_index].card_ability);
                                                
                        //Assign to the player's card the computer's card
                        player.hand[player_card_index].card_type = computer.hand[computer_card_index].card_type;
                        player.hand[player_card_index].card_suit = computer.hand[computer_card_index].card_suit;
                        player.hand[player_card_index].card_point = computer.hand[computer_card_index].card_point;
                        player.hand[player_card_index].card_ability = computer.hand[computer_card_index].card_ability;

                        //Assign to the computer's card the placeholder_card (player card)
                        //**For the known hand, we assign undefined because the computer won't know its new changed card.
                        computer.hand[computer_card_index].card_type = placeholder_card.card_type;
                        computer.hand[computer_card_index].card_suit = placeholder_card.card_suit;
                        computer.hand[computer_card_index].card_point = placeholder_card.card_point;
                        computer.hand[computer_card_index].card_ability = placeholder_card.card_ability;
                        computer.known_hand[computer_card_index].card_type = undefined;
                        computer.known_hand[computer_card_index].card_suit = undefined;
                        computer.known_hand[computer_card_index].card_point = undefined;
                        computer.known_hand[computer_card_index].card_ability = undefined;
                        alert("The computer has switched your Card "+(player_card_index+1)+" with one of its own!");
                    }
                }
            }
            else{} //Else do nothing
        }
    }
};

//Function that let's the user play one of their own cards, whether right or wrong
const play_card = (user, pile) => {
    alert("HERE");
    while(true){ //The player is being prompted until a correct action is taken
        let card_number = +String(prompt("\n----- Choose which card you would like to play -----\n"+
                                         "(Enter the card number)\n"));
        if(Number.isNaN(card_number)){ //Check if user entered a number
            alert("Please enter a number!");
        }
        else if(card_number > user.hand.length){ //Check if user entered a number above the total of their hand
            alert("You only have "+user.hand.length+" cards, "+card_number+" is too high!");
        }
        else if(card_number < 1){ //Check if user entered a number below 1
            alert("Please choose a number above 0! (There's no CARD "+card_number+")");
        }
        else{
            let played_card = user.hand[card_number-1]; //Get the card from the user's hand that will be played
            //Check if the card is the same type as the pile card
            if(played_card.card_type == pile.card_type){ //If yes, play the card and remove card from hand
                alert("RIGHT!");
                user.hand.splice((card_number-1), 1); //Remove played card from the hand
                user.num_of_cards -= 1; //Decrement the number of cards from the hand
                play_card_on_pile(user, played_card, pile, false); //Play the card
                break;
            }
            //If no, card isn't played and user draws a random card, adding it to their hand
            else{
                alert("WRONG!");
                let drawn_card = new Card();
                draw_card(drawn_card); //Draw a random card
                user.hand.push(drawn_card); //Add drawn card to the hand
                user.num_of_cards += 1; //Increment the number of cards from the hand
                break;
            }
        }
    }
};

//Function that let's the user play a card from the computer's hand
const play_opponent_card = (computer, player, pile) => {
    while(true){ //Make sure the user is entering a valid number
        let computer_card_number = +String(prompt("----- Which card would you like to play from the computer's hand? -----\n"+
                                            "(Enter the card number)\n"));
        if(Number.isNaN(computer_card_number)){ //Check if user entered a number
            alert("Please enter a number!");
        }
        else if(computer_card_number > computer.hand.length){ //Check if user entered a number above the total of the computer's hand
            alert("The computer has "+computer.hand.length+" cards, "+computer_card_number+" is too high!");
        }
        else if(computer_card_number < 1){ //Check if user entered a number below 1
            alert("Please choose a number above 0! (There's no CARD "+computer_card_number+")");
        }
        else{ //If the user enters a valid number
            if(computer.hand[computer_card_number-1].card_type == pile.card_type){ //Check if the played card has the same type as the pile card
                play_card_on_pile(computer, computer.hand[computer_card_number-1], pile, true); // Play the computer's card
                computer.known_hand.splice((computer_card_number-1), 1); //Remove played card from the known hand
                computer.hand.splice((computer_card_number-1), 1); //Remove played card from the actual hand
                computer.num_of_cards -= 1; //Decrement the number of cards from the hand
                alert("Computer is drawing a random card...");
                let drawn_card = new Card (); //Create a new card object that will be assigned the random drawn card
                draw_card(drawn_card); //Draw a random card from the deck
                computer.hand.push(drawn_card); //Add the card to the actual hand
                computer.known_hand.push(new Card()); //Add the card to the known hand (values are undefined)
                computer.num_of_cards += 1; //Increment the number of cards from the hand
            }
            else {
                alert("Can't play a "+computer.hand[computer_card_number-1].card_type+ " "+ computer.hand[computer_card_number-1].card_suit +
                      " on a "+pile.card_type + " " + pile.card_suit);
                alert("Drawing a random card...");
                let drawn_card = new Card (); //Create a new card object that will be assigned the random drawn card
                draw_card(drawn_card); //Draw a random card from the deck
                player.hand.push(drawn_card); //Add the card to the actual hand
                player.num_of_cards += 1; //Increment the number of cards from the hand
            }
            break; //Exit the while loop
        }
    }
};

//This function is the game loop
const game_engine = () => {
    start_game(); //Starts the game by giving each player 4 cards
    alert("Game of Dutch has started!\nRemember your two revealed cards! (In the console)\nPress any button to continue!"); //Announce to the user that the game has started
    console.clear(); //Clear the console

    
    let pile = new Card(); //Create an object "pile" card, which is the last played card in the pile (starts empty - undefined)

    display_full_hand(computer, player, pile);
    // display_hidden_hand(computer, player, pile); //Display the computer's and player's hands, cards facing down
    

    let dutch_called = false; //Keep track if someone has called "Dutch"
    let player_turn = true; //Keep track if player's turn
    let player_has_drawn = false; //Keep track if player has drawn during their turn
    let player_has_played = false; //Keep track if player has played during their turn
    let computer_turn = false; //Keep track if computer's turn
    while(!dutch_called){ //While "Dutch" hasn't been called

        while(player_turn){ //While it is the player's turn

            if(computer.dutch){ //If the computer called Dutch, this is the last turn for the player
                dutch_called = true; //Notate that Dutch has been called
            }

            if(player.num_of_cards == 0 && !player_has_played) { //If the player's hand is empty at the start of the turn, automatically Dutch.
                player.dutch = true; //Notate that the player has called Dutch automatically
                player_turn = false; //Set player's turn to false
                computer_turn = true; //Set computer's turn to true
                if(computer.dutch){
                    alert("No cards in your hand. Skipping turn.");
                }
                else{
                    alert("No cards in your hand, automatically calling Dutch! Skipping turn.");
                }
                break;
            }
            let player_action = String(prompt("----- Choose action -----\n"+ //Prompt the player for an action
                                              " 1 Draw card\n"+
                                              " 2 Play own card\n"+
                                              " 3 Play opponent's card\n"+
                                              " 4 Dutch\n"+
                                              " 5 End turn")).toLowerCase();
            if(player_action == "1"){ //If the user enters "1" for "draw card"
                let drawn_card = new Card (); //Create a new card object that will be assigned the random drawn card
                if(!player_has_drawn){ //If the player hasn't already drawn yet
                    if(player.dutch){ //If the player has already called Dutch, skip drawing a card
                        alert("Can't draw a card after calling Dutch!");
                    }
                    else if(player.num_of_cards == 0){//If the player's hand is empty, they can't play a draw.
                        alert("Can't draw a card while your hand is empty!");
                    }
                    else{ //If the player hasn't call Dutch or isn't empty handed, draws a card
                        draw_card(drawn_card); //Draw a random card and assign to drawn_card
                        player_has_drawn = true; //Notate that the player has drawn during this turn
                        
                        while(true){ //The player is being prompted until a correct action is taken
                            let drawn_card_action = String(prompt("You drew a \n-----\n|"+drawn_card.card_type+"|\n|"+drawn_card.card_suit+"|\n-----\n"+
                                                                "Points: "+drawn_card.card_point+"\n"+
                                                                "Ability: "+drawn_card.card_ability+"\n"+
                                                                "\n----- Choose action for the drawn card -----\n"+
                                                                " 1 Switch card\n"+
                                                                " 2 Play drawn card\n")).toLowerCase();
                            if(drawn_card_action == "1"){ //If the user enters "1" after drawing for "switch card"
                                switch_card(player, drawn_card, pile); //Switch the drawn card with one of the player's cards
                                display_full_hand(computer, player, pile); //Update view
                                break;
                            }
                            else if(drawn_card_action == "2"){ //If the user enters "2" after drawing for "play drawn card"
                                play_card_on_pile(player, drawn_card, pile, false); //Play one of the player's cards
                                display_full_hand(computer, player, pile); //Update view
                                break;
                            }
                            else { //If the user doesn't enter a proper action
                                alert("Please enter a proper action!"); 
                            }
                        }
                    }
                }
                else{ //If the user has already drawn
                    alert("You've already drawn a card");
                }
            }
            else if(player_action == "2"){ //If the user enters "2" for "play own card"
                if(player.num_of_cards == 0){ //If the player's hand is empty, they can't play a card.
                    alert("Can't play a card while your hand is empty!");
                }
                else if(pile.card_type == undefined){ //If the pile is empty (the game is just started)
                    alert("Can't play a card while the card pile is empty!");
                }
                else{
                    play_card(player, pile);    //Figure out further the play function, works kinda... flesh it out fully!
                    player_has_played = true; //Notate that the player has played.
                    display_full_hand(computer, player, pile); //Update view
                }
            }
            else if(player_action == "3"){ //If the user enters "3" for "play opponent's card"
                if(player.num_of_cards == 0){ //If the player's hand is empty, they can't play the opponent's card.
                    alert("Can't play opponent's card while your hand is empty!");
                }
                else if(computer.num_of_cards == 0){ //If the computer's hand is empty, the player can't play the opponent's card.
                    alert("Can't play opponent's card since their hand is empty!");
                }
                else if(pile.card_type == undefined){ //If the pile is empty (the game just started)
                    alert("Can't play opponent's card while the card pile is empty!");
                }
                else{
                    alert("Playing opponent's card!");
                    play_opponent_card(computer, player, pile);
                    display_full_hand(computer, player, pile); //Update view
                }
            }
            else if(player_action == "4"){ //If the user enters "4" for "Dutch"
                if(computer.dutch){ //Check if the computer has already called Dutch
                    alert("Computer has already called Dutch!");
                }
                else if(player_has_drawn){ //If the player has drawn, they can't call Dutch in the same turn
                    alert("Can't Dutch after drawing a card!");

                }
                else{ //The player has called Dutch
                    alert("Called Dutch!")
                    player.dutch = true; //Notate that the player has called Dutch
                }
                
            }
            else if(player_action == "5"){ //If the user enters "5" for "End turn"
                if(!player_has_drawn && !player.dutch){
                    alert("Can't end turn without drawing or calling Dutch");
                }
                else{
                    player_turn = false; //Set player's turn to false
                    player_has_played = false; //Set that the player hasn't played (for next turn)
                    player_has_drawn = false; //Notate that the player hasn't drawn (for next turn)
                    computer_turn = true; //Set computer's turn to true 
                }
                
            }
            else{ //If the user doesn't enter a proper action
                alert("Please enter a proper action!");
            }
        
        }

        //Computer logic
        //0. Computer has a 2% chance of randomly calling Dutch whenever it is its turn.
        //      CHECKING: Check if computer's hand is empty. (Automatic Dutch)
        //1. Computer will check if it can play anything from its KNOWN HAND, looking at the pile card.
        //      CHECKING: Check if computer's hand is empty. (Automatic Dutch)
        //2. Computer will draw a card, 50% it switches with a card from its hand, 50% it plays it immediately.
        //3. Computer will check again if it can play, reference (1.).
        //4. Computer will end its turn.
        while(computer_turn && !dutch_called){ //While it is the computer's turn and Dutch hasn't been called
            alert("Computer's turn!");
            //Every turn, the computer has 2% chance of randomly calling Dutch, except if the player has already called Dutch
            if(!player.dutch){ //Check if player hasn't called Dutch
                if(random_number(100) < 2){ //Get a random number between 0-99, if the number is between 0-4, computer calls Dutch
                    alert("Computer has called Dutch!");
                    computer.dutch = true; //Notate that the computer has called Dutch
                    computer_turn = false; //Set the computer's turn to false
                    player_turn = true; //Set the player's turn to true
                    break;
                }
            }
            else{
                dutch_called = true;
            }

            //CHECKING: If computer's hand is empty at the start of its turn, automatic Dutch and skip turn.
            if(computer.num_of_cards == 0){
                computer.dutch = true; //Notate that the computer has called Dutch
                computer_turn = false; //Set the computer's turn to false
                player_turn = true; //Set the player's turn to true
                alert("No cards in computer's hand, automatically calling Dutch! Skipping turn.");
                break;
            }
            
            //1. Computer will check if it can play anything from its KNOWN HAND, looking at the pile card.
            for(let c_type = 0; c_type < computer.known_hand.length; c_type++){ //"c_type" abb. "Card Type"
                if(computer.known_hand[c_type].card_type == undefined){ //Looking at it's "unknown" cards
                    continue;
                }
                else if(computer.known_hand[c_type].card_type == pile.card_type){ //Checking with its "known" cards
                    play_card_on_pile(computer, computer.known_hand[c_type], pile, false); //Play the corresponding card on the pile
                    computer.known_hand.splice(c_type, 1); //Remove played card from the known hand
                    computer.hand.splice(c_type, 1); //Remove played card from the actual hand
                    computer.num_of_cards -= 1; //Decrement the number of cards from the hand
                }
                else{ //Else, play nothing
                    continue;
                }
            }

            //CHECKING: If computer's hand is empty after playing, can't draw, skip turn.
            if(computer.num_of_cards == 0){ 
                computer_turn = false; //Set the computer's turn to false
                player_turn = true; //Set the player's turn to true
                if(player.dutch){
                    alert("No cards in computer's hand. Skipping turn.");
                }
                else{
                    alert("No cards in computer's hand, automatically calling Dutch! Skipping turn.");
                }
                break;
            }

            //2. Computer will draw a card, 50% it switches with a card from its hand, 50% it plays it immediately.
            let drawn_card = new Card (); //Create a new card object that will be assigned the random drawn card
            draw_card(drawn_card); //Draw a random card from the deck
            alert("Computer is drawing a card...");
            alert("The computer has drawn a \n-----\n|"+drawn_card.card_type+"|\n|"+drawn_card.card_suit+"|\n-----\n"+
            "Points: "+drawn_card.card_point+"\n"+
            "Ability: "+drawn_card.card_ability);
            if(random_number(100) < 50){ //Gets a random number between 0-99, if the number is lower than 50, switches the drawn card, else plays the drawn card.
                alert("Computer is switching a card from its hand.");
                switch_card(computer, drawn_card, pile); //Switch the drawn card with a random card from the computer's hand.
            }
            else { //Play the drawn card
                alert("Computer is playing the drawn card.");
                play_card_on_pile(computer, drawn_card, pile, false); //Play the drawn card
            }

            //3. Computer will check again if it can play, reference (1.).
            for(let c_type = 0; c_type < computer.known_hand.length; c_type++){ //"c_type" abb. "Card Type"
                if(computer.known_hand[c_type].card_type == undefined){ //Looking at it's "unknown" cards
                    continue;
                }
                else if(computer.known_hand[c_type].card_type == pile.card_type){ //Checking with its "known" cards
                    play_card_on_pile(computer, computer.known_hand[c_type], pile, false); //Play the corresponding card on the pile
                    computer.known_hand.splice(c_type, 1); //Remove played card from the known hand
                    computer.hand.splice(c_type, 1); //Remove played card from the actual hand
                    computer.num_of_cards -= 1; //Decrement the number of cards from the hand
                }
                else{ //Else, play nothing
                    continue;
                }
            }
            //4. Computer will end its turn.
            alert("Computer's turn ended.");
            computer_turn = false; 
            player_turn = true;
        }

        // display_hidden_hand(computer, player, pile); //Display the computer's and player's hands, cards facing down
        display_full_hand(computer, player, pile); //Display the computer's and player's hands, cards facing up
    }
    alert("End of game!");

    //Count up the total score
    let total_player_score = 0;
    let total_computer_score = 0;

    if(player.num_of_cards != 0){
        for(let i = 0; i < player.num_of_cards; i++){
            total_player_score += player.hand[i].card_point;
        }
    }
    if(computer.num_of_cards != 0){
        for(let i = 0; i < computer.num_of_cards; i++){
            total_computer_score += computer.hand[i].card_point;
        }
    }

    alert("Final Score\n\n"+"Player's score: " + total_player_score +"\nComputer's score: " + total_computer_score);

    if(total_computer_score > total_player_score){
        alert("The player won!");
    }
    else if(total_computer_score < total_player_score){
        alert("The computer won!");
    }
    else{
        alert("The game is a tie!");
    }
};
//Launch the game
// game_engine();


