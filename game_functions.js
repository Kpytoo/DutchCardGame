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
    deck_div.appendChild(deck_visual_card);
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


                card_name_visual = ("CARDS\\" + card_suit + "_" + card_type + ".png"); //NEW
                visual_card = document.createElement("img"); //NEW
                visual_card.setAttribute("src", card_name_visual); //NEW 
                
                if(computer.num_of_cards < 4){ //Give the computer 4 random cards
                    computer.hand.push(new Card(card_type, card_suit, card_point, card_ability)); //Create a card object using the card type and card suit and add it to their hand
                    
                    computer.visual_hand.push(visual_card); //NEW
                    computer_hand_div.appendChild(visual_card); //NEW

                    if(computer.num_of_cards == 1 || computer.num_of_cards == 3){
                        computer.known_hand.push(new Card(card_type, card_suit, card_point, card_ability)); //The bottom 2 cards, (index 1 and 3) the computer DOES know about them
                    }
                    else{
                        computer.known_hand.push(new Card(undefined, undefined, undefined, undefined)); //The top 2 cards, (index 0 and 2) the computer doesn't know about them
                    }
                    computer.num_of_cards++; //Increment the number of cards in the computer's hand
                }
                else if(player.num_of_cards < 4){ //Give the player 4 random cards
                    player.hand.push(new Card(card_type, card_suit, card_point, card_ability)); //Create a card object using the card type and card suit and add it to their hand
                    player.num_of_cards++; //Increment the number of cards in the player's hand

                    player.visual_hand.push(visual_card); //NEW
                    player_hand_div.appendChild(visual_card); //NEW
                }
            }
            else { //If there are no more suits of the random card type (all suits of that card were drawn)
                deck_of_cards.splice(chosen_card_index, 1); //Remove the card type from the deck (because all suits of that card were drawn)
            }
        }
    } //End while loop

    display_number_of_cards_in_deck.textContent = "Cards: "+num_of_cards_in_deck();
    
    // //Display starting hand to player (reveals only 2 cards)
    // for(let i = 0; i < player.num_of_cards; i++){
    //     if(i == 1 || i == 3){
    //         console.log("-----\n|"+player.hand[i].card_type+"|\n|"+player.hand[i].card_suit+"|\n-----\n"+
    //         "Points: "+player.hand[i].card_point+"\n"+
    //         "Ability: "+player.hand[i].card_ability); 
    //     }
    //     else{
    //         console.log("-----\n|CARD "+ (i+1) +"|\n-----");
    //     }
    // }
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
                display_number_of_cards_in_deck.textContent = "Cards: "+num_of_cards_in_deck();
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
