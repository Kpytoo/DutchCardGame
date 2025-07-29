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
        if(computer.num_of_cards == 4 && player.num_of_cards == 4){//Checks if the computer and the player have 4 cards
            break; //Break from the while loop
        } 
        //If both the computer and player don't have 4 cards, give them cards!!!
        let chosen_card_index = random_number(deck_of_cards.length); //Generate a random number to get a random card type
        let chosen_card = deck_of_cards[chosen_card_index]; //Retrieve a random card from the deck
        if(chosen_card[1].length == 0){ //If there are no more suits of the random card type (all suits of that card were drawn)
            deck_of_cards.splice(chosen_card_index, 1); //Remove the card type from the deck (because all suits of that card were drawn)
            continue;
        } //If suits of the chosen card are still available in the deck
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
    if(deck_of_cards.length == 0){
        alert("Deck is empty! Game finished. Reveal your cards!");
        return;
    } //If the deck isn't empty
    while(deck_of_cards.length != 0){ //If there are no more suits of the random card type (all suits of that card were drawn)
        let chosen_card_index = random_number(deck_of_cards.length); //Generate a random number to get a random card type
        let chosen_card = deck_of_cards[chosen_card_index]; //Retrieve a random card from the deck
        if(chosen_card[1].length == 0){
            deck_of_cards.splice(chosen_card_index, 1); //Remove the card type from the deck (because all suits of that card were drawn)
            continue;
        } //If suits of the chosen card are still available in the deck 
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
};

//Function that plays a card by placing it on the pile and using its ability
// played_by_opp (bool val) --> if it was played by the opponent, if yes, don't use the abilities
const play_card_on_pile = (user, card, pile, played_by_opp) => {
    //Switch the pile card with the played card
    pile.card_type = card.card_type;
    pile.card_suit = card.card_suit;
    pile.card_point = card.card_point;
    pile.card_ability = card.card_ability;

    // if(played_by_opp != true){ //If the opponent didn't play your card, or vice versa
    //     if(user == player){ //If the user is playing the card.
    //         if(card.card_type == "seven"){ //If the player is playing a seven.
    //             if(user.num_of_cards != 0){ //Check if user's hand isn't empty
    //                 alert("Checking from playing seven!");  
    //             }
    //             else{
    //                 alert("You've played a seven!\n Can't peek if you have no more cards in hand!");
    //             }
    //         }
    //         else if(card.card_type == "eight"){ //If the player is playing an eight.
    //             if(computer.num_of_cards != 0){ //Check if computer's hand isn't empty
    //                 alert("Checking computer's hand from playing an eight!");
    //             }
    //             else{
    //                 alert("You've played an eight!\n Can't peek if the computer has no more cards in its hand!");
    //             }
    //         }
    //         else if(card.card_type == "ten"){ //If the player is playing a ten.
    //             if(computer.num_of_cards != 0){ //Check if computer's hand isn't empty
    //                 if(player.num_of_cards != 0){ //Also check if the player's hand isn't empty
    //                     alert("Played a ten! Deciding to switch or not... Then proceeding with the chosen action");
    //                 }
    //                 else{ //Can't switch cards after playing a ten if the player has no cards in hand.
    //                     alert("You've played a ten!\n Can't switch cards if you don't have anymore cards in your hand!")
    //                 }   
    //             }
    //             else{ //Can't switch cards after playing a ten if the computer has no cards in hand.
    //                 alert("You've played a ten!\n Can't switch cards if the computer has no more cards in its hand!");
    //             }
    //         }
    //         else{} //Else do nothing
    //     }
    //     else{ //If the computer is playing the card.
    //         if(card.card_type == "seven"){ //If the computer is playing a seven.
    //             if(computer.num_of_cards != 0){//If the computer's hand isn't empty
    //                 for(let card_index = 0; card_index < computer.num_of_cards; card_index++){ //Check for cards that are unknown to the comp in the known hand (values are undefined)
    //                     if(computer.known_hand[card_index].card_type == undefined){ //If found, make the card known to the card computer
    //                         alert(card_index + " " + computer.known_hand[card_index].card_type + " " + computer.known_hand[card_index].card_suit);
    //                         computer.known_hand[card_index].card_type = computer.hand[card_index].card_type;
    //                         computer.known_hand[card_index].card_suit = computer.hand[card_index].card_suit;
    //                         computer.known_hand[card_index].card_point = computer.hand[card_index].card_point;
    //                         computer.known_hand[card_index].card_ability = computer.hand[card_index].card_ability;
    //                         alert(card_index + " " + computer.known_hand[card_index].card_type + " " + computer.known_hand[card_index].card_suit);
    //                         break; //Break out of the for loop
    //                     }
    //                 }
    //             }
    //         }
    //         else if(card.card_type == "eight"){ //If the computer is playing an eight, it doesn't do anything --- dumb computer :(
    //         }
    //         else if(card.card_type == "ten"){ //If the computer is playing a ten.
    //             // alert("ten was used by the computer");
    //             if(player.num_of_cards != 0){ //Check if the player's hand isn't empty
    //                 if(computer.num_of_cards != 0){ //also check if computer's hand isn't empty
    //                     let player_card_index = random_number(player.num_of_cards); //Get a random index based on the player's hand
    //                     let computer_card_index = random_number(computer.num_of_cards); //Get a random index based on the computer's hand

    //                     let placeholder_card = new Card(player.hand[player_card_index].card_type, //Make a place holder card during the switch.
    //                                                     player.hand[player_card_index].card_suit,
    //                                                     player.hand[player_card_index].card_point,
    //                                                     player.hand[player_card_index].card_ability);

    //                     let placeholder_card_src = player.visual_hand[player_card_index].getAttribute("src");

    //                     //Assign to the player's card the computer's card
    //                     player.hand[player_card_index].card_type = computer.hand[computer_card_index].card_type;
    //                     player.hand[player_card_index].card_suit = computer.hand[computer_card_index].card_suit;
    //                     player.hand[player_card_index].card_point = computer.hand[computer_card_index].card_point;
    //                     player.hand[player_card_index].card_ability = computer.hand[computer_card_index].card_ability;

    //                     player.visual_hand[player_card_index].setAttribute("src", computer.visual_hand[computer_card_index].getAttribute("src"));
    //                     player.visual_hand[player_card_index].style.animationIterationCount = "1";
    //                     player.visual_hand[player_card_index].style.animationName = "switching_cards_in_hand_from_playing_ten";

    //                     //Assign to the computer's card the placeholder_card (player card)
    //                     //**For the known hand, we assign undefined because the computer won't know its new changed card.
    //                     computer.hand[computer_card_index].card_type = placeholder_card.card_type;
    //                     computer.hand[computer_card_index].card_suit = placeholder_card.card_suit;
    //                     computer.hand[computer_card_index].card_point = placeholder_card.card_point;
    //                     computer.hand[computer_card_index].card_ability = placeholder_card.card_ability;
    //                     computer.known_hand[computer_card_index].card_type = undefined;
    //                     computer.known_hand[computer_card_index].card_suit = undefined;
    //                     computer.known_hand[computer_card_index].card_point = undefined;
    //                     computer.known_hand[computer_card_index].card_ability = undefined;

    //                     computer.visual_hand[computer_card_index].setAttribute("src", placeholder_card_src);
    //                     computer.visual_hand[computer_card_index].style.animationIterationCount = "1";
    //                     computer.visual_hand[computer_card_index].style.animationName = "switching_cards_in_hand_from_playing_ten";

    //                     // alert("The computer has switched your Card "+(player_card_index+1)+" with one of its own!");
    //                 }
    //             }
    //         }
    //         else{} //Else do nothing
    //     }
    // }
};

//Function that switches one card from the user's hand with the drawn card, and plays the switched card
const switch_card = (user, drawn_card, switched_card_index, pile) => { //switched_card_index is "undefined" if the computer calls the function
    if(user == computer){ //If computer is switching
        // alert("Computer is switching!");
        let random_card = random_number(user.num_of_cards);
        setTimeout(()=>{
            let card_src = user.visual_hand[random_card].getAttribute("src");
            user.visual_hand[random_card].setAttribute("src", visual_card.getAttribute("src"));
            user.visual_hand[random_card].style.animationName = "switching_cards_in_hand";
            visual_card.setAttribute("src", card_src);
        }, 2000);
        setTimeout(()=>{
            if(user.visual_hand[random_card] != undefined){
                user.visual_hand[random_card].style.animationName = "none"; 
            }
        }, 4000);
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
        setTimeout(()=>{
            play_card_on_pile(user, switched_card, pile, false); //Play the switched card     
        }, 2100);
    }
    else{ //If player is switching
        let switched_card = new Card(user.hand[switched_card_index].card_type, //Get the card from the user's hand that will be switched
                                     user.hand[switched_card_index].card_suit,
                                     user.hand[switched_card_index].card_point,
                                     user.hand[switched_card_index].card_ability);   
        user.hand[switched_card_index].card_type = drawn_card.card_type;
        user.hand[switched_card_index].card_suit = drawn_card.card_suit;
        user.hand[switched_card_index].card_point = drawn_card.card_point;
        user.hand[switched_card_index].card_ability = drawn_card.card_ability;
        play_card_on_pile(user, switched_card, pile, false); //Play the switched card
    }
};

//Function that let's the user play one of their own cards, whether right or wrong
let play_card = (pile, e) =>{
    for(let i = 0; i < player.num_of_cards; i++){
        if(player.visual_hand[i].getAttribute("src") != e.target.getAttribute("src")){ //Check which card was clicked on
            continue;
        }
        if(player.hand[i].card_type != pile.card_type){ //If wrong card was played
            player.visual_hand[i].style.animationIterationCount = "1";
            player.visual_hand[i].style.animationName = "wrong_card_played_vibration";
            player.visual_hand[i].addEventListener("animationend", (e) => {
                draw_card(drawn_card);
                player.hand.push(new Card(drawn_card.card_type, drawn_card.card_suit, drawn_card.card_point, drawn_card.card_ability));
                player.num_of_cards++;
                visual_card = document.createElement("img");
                visual_card.setAttribute("src", ("CARDS\\" + drawn_card.card_suit + "_" + drawn_card.card_type + ".png"));
                player.visual_hand.push(visual_card);
                player_hand_div.appendChild(visual_card);
                player.visual_hand[i].style.animationName = "none";
                visual_card.style.animationIterationCount = "1";
                visual_card.style.animationName = "switching_cards_in_hand";
                visual_card.addEventListener("animationend", (e) => {
                    visual_card.style.animationIterationCount = "infinite";
                    visual_card.style.animationName = "none";
                }, {once: true}); 
            }, {once: true});
            break;
        } //If right card was played 
        player.visual_hand[i].style.visibility = "hidden";
        visual_card = document.createElement("img");
        visual_card.setAttribute("src", e.target.getAttribute("src"));
        visual_card.style.transform = "rotate("+(45 - random_number(91))+"deg)";
        visual_card.style.animationName = "player_playing_card";
        pile_div.appendChild(visual_card);
        play_card_on_pile(player, player.hand[i], pile, false);
        for(let j = (i+1); j < player.num_of_cards; j++){
            if(j%2 == 0){
                player.visual_hand[j].style.animationIterationCount = "1";
                player.visual_hand[j].style.animationName = "card_top_row_translation";
            }
            else{
                player.visual_hand[j].style.animationIterationCount = "1";
                player.visual_hand[j].style.animationName = "card_bottom_row_translation";
            }
        }
        //We make sure the animations have ended before continuing
        player.visual_hand[player.num_of_cards-1].addEventListener("animationend", (animationEvent) =>{
            player_hand_div.removeChild(e.target);
            player.visual_hand.splice(i, 1);
            player.hand.splice(i, 1);
            player.num_of_cards -= 1;
            display_full_hand(computer, player, pile);   
        }, {once: true});
    }
};

//Function that let's the user play one of their own cards, whether right or wrong
let play_card_from_computer = (pile, e) =>{
    for(let i = 0; i < computer.num_of_cards; i++){
        if(computer.visual_hand[i].getAttribute("src") != e.target.getAttribute("src")){
            continue;
        }
        if(computer.hand[i].card_type != pile.card_type){ //If wrong card was played
            computer.visual_hand[i].style.animationIterationCount = "1";
            computer.visual_hand[i].style.animationName = "wrong_card_played_vibration";
            computer.visual_hand[i].addEventListener("animationend", (e) =>{
                draw_card(drawn_card);
                player.hand.push(new Card(drawn_card.card_type, drawn_card.card_suit, drawn_card.card_point, drawn_card.card_ability));
                player.num_of_cards++;
                visual_card = document.createElement("img");
                visual_card.setAttribute("src", ("CARDS\\" + drawn_card.card_suit + "_" + drawn_card.card_type + ".png"));
                player.visual_hand.push(visual_card);
                player_hand_div.appendChild(visual_card);
                computer.visual_hand[i].style.animationName = "none";
                visual_card.style.animationIterationCount = "1";
                visual_card.style.animationName = "switching_cards_in_hand";
                visual_card.addEventListener("animationend", (e) => {
                    visual_card.style.animationIterationCount = "infinite";
                    visual_card.style.animationName = "none";  
                }, {once: true});
            }, {once: true});
            break;
        } //If right card was played
        deck_div.style.pointerEvents = "none";
        button_end_turn.style.animationName = "button_pop_out";
        button_dutch.style.animationName = "button_pop_out";
        button_dutch.style.pointerEvents = "none";
        computer.visual_hand[i].style.visibility = "hidden";
        visual_card = document.createElement("img");
        visual_card.setAttribute("src", e.target.getAttribute("src"));
        visual_card.style.transform = "rotate("+(225 - random_number(91))+"deg)";
        visual_card.style.animationName = "computer_playing_card";
        pile_div.appendChild(visual_card);
        play_card_on_pile(computer, computer.hand[i], pile, true);
        for(let j = (i+1); j < computer.num_of_cards; j++){
            if(j%2 == 0){
                computer.visual_hand[j].style.animationIterationCount = "1";
                computer.visual_hand[j].style.animationName = "card_bottom_row_translation_computer"
            }
            else{
                computer.visual_hand[j].style.animationIterationCount = "1";
                computer.visual_hand[j].style.animationName = "card_top_row_translation_computer";
            }
        }
        //We make sure the animations have ended before continuing
        visual_card.addEventListener("animationend", (animationEvent) =>{
            computer_hand_div.removeChild(e.target);
            computer.visual_hand.splice(i, 1);
            computer.known_hand.splice(i, 1);
            computer.hand.splice(i, 1);
            computer.num_of_cards -= 1;
            display_full_hand(computer, player, pile);
            // document.querySelectorAll(".player_hand > img").forEach(e => {
            //     e.style.animationIterationCount = "infinite";
            //     e.style.animationName = "switching_shaking_cards";
            // });
            for(let img = 0; img < player.num_of_cards; img++){
                player.visual_hand[img].style.animationIterationCount = "infinite";
                player.visual_hand[img].style.animationName = "switching_shaking_cards";
            }
            // document.querySelectorAll(".computer_hand > img").forEach(e => {
            //     e.style.pointerEvents = "none";
            // });
            for(let img = 0; img < computer.num_of_cards; img++){
                computer.visual_hand[img].style.pointerEvents = "none";
            }
            player_hand_div.addEventListener("click", player_choosing_own_card_to_give_to_computer);
        }, {once: true});
    }
};

//Computer will check if it can play anything from its KNOWN HAND, looking at the pile card.
let computer_play_card = (pile) => {
    for(let c_type = 0; c_type < computer.num_of_cards; c_type++){ //"c_type" abbv. "Card Type"
        if(computer.known_hand[c_type].card_type == undefined){ //Looking at its "unknown" cards
            continue;
        }
        else if(computer.known_hand[c_type].card_type == pile.card_type){ //Checking with its "known" cards
            play_card_on_pile(computer, computer.known_hand[c_type], pile, false); //Play the corresponding card on the pile
            computer.visual_hand[c_type].style.visibility = "hidden";
            for(let i = (c_type+1); i < computer.num_of_cards; i++){
                if(i%2 == 0){
                    computer.visual_hand[i].style.animationIterationCount = "1";
                    computer.visual_hand[i].style.animationName = "card_bottom_row_translation_computer";
                }
                else{
                    computer.visual_hand[i].style.animationIterationCount = "1";
                    computer.visual_hand[i].style.animationName = "card_top_row_translation_computer";
                }
            }
            visual_card = document.createElement("img");
            visual_card.setAttribute("src", ("CARDS\\" + computer.known_hand[c_type].card_suit + "_" + computer.known_hand[c_type].card_type + ".png"));
            visual_card.style.transform = "rotate("+(225 - random_number(91))+"deg)";
            visual_card.style.animationName = "computer_playing_card";
            pile_div.appendChild(visual_card);
            setTimeout(()=>{
                computer_hand_div.removeChild(computer.visual_hand[c_type]); //Visuals of the cards
                computer.visual_hand.splice(c_type, 1); //Actual imgs
                computer.known_hand.splice(c_type, 1); //Remove played card from the known hand
                computer.hand.splice(c_type, 1); //Remove played card from the actual hand
                computer.num_of_cards -= 1; //Decrement the number of cards from the hand
            }, 500);
            display_full_hand(computer, player, pile);
        }
        else{ //Else, play nothing
            continue;
        }
    }
};
//Computer logic
//0. Computer has a 2% chance of randomly calling Dutch whenever it is its turn.
//      CHECKING: Check if computer's hand is empty. (Automatic Dutch)
//1. Computer will check if it can play anything from its KNOWN HAND, looking at the pile card.
//      CHECKING: Check if computer's hand is empty. (Automatic Dutch)
//2. Computer will draw a card, 50% it switches with a card from its hand, 50% it plays it immediately.
//3. Computer will check again if it can play, reference (1.).
//4. Computer will end its turn.
let computer_playing_turn = () =>{
    //Every turn, the computer has 2% chance of randomly calling Dutch, except if the player has already called Dutch
    if(!player.dutch){ //Check if player hasn't called Dutch
        if(random_number(100) < 2){ //Get a random number between 0-99, if the number is between 0-2, computer calls Dutch
            document.querySelector("div.computer_dutch").style.display = "initial";
            computer.dutch = true; //Notate that the computer has called Dutch
            computer_end_turn();
            return;
        }
    }

    //CHECKING: If computer's hand is empty at the start of its turn, automatic Dutch and skip turn.
    if(computer.num_of_cards == 0){
        computer_end_turn()
        if(!player.dutch){ //Automatic dutch if empty handed
            document.querySelector("div.computer_dutch").style.display = "initial";
            computer.dutch = true;
        }
        return;
    }

    //1. Computer will check if it can play anything from its KNOWN HAND, looking at the pile card.
    computer_play_card(pile);

    //CHECKING: If computer's hand is empty after playing, can't draw, skip turn.
    if(computer.num_of_cards == 0){ 
        computer_end_turn()
        if(!player.dutch){ //Automatic dutch if empty handed
            document.querySelector("div.computer_dutch").style.display = "initial";
            computer.dutch = true;
        }
        return;
    }

    //2. Computer will draw a card, 50% it switches with a card from its hand, 50% it plays it immediately.
    setTimeout(() =>{
        draw_card(drawn_card); //Draw a random card from the deck
        visual_card = document.createElement("img");
        visual_card.setAttribute("src", ("CARDS\\" + drawn_card.card_suit + "_" + drawn_card.card_type + ".png"));
        container_computer_card_action.style.display = "initial";
        computer_card_action.appendChild(visual_card);
        if(random_number(100) < 50){ //Gets a random number between 0-99, if the number is lower than 50, switches the drawn card, else plays the drawn card.
            switch_card(computer, drawn_card, undefined, pile); //Switch the drawn card with a random card from the computer's hand.
            setTimeout(()=>{
                computer_card_action.removeChild(visual_card);
                container_computer_card_action.style.display = "none";
                visual_card.style.transform = "rotate("+(225 - random_number(91))+"deg)";
                visual_card.style.animationName = "computer_playing_card";
                pile_div.appendChild(visual_card);
            }, 2000);
            console.log(computer.known_hand);
        }
        else { //Play the drawn card
            // alert("Computer is playing the drawn card.");
            play_card_on_pile(computer, drawn_card, pile, false); //Play the drawn card
            setTimeout(()=>{
                computer_card_action.removeChild(visual_card);
                container_computer_card_action.style.display = "none";
                visual_card.style.transform = "rotate("+(225 - random_number(91))+"deg)";
                visual_card.style.animationName = "computer_playing_card";
                pile_div.appendChild(visual_card);
            }, 2000);
            console.log(computer.known_hand);
        }           
    }, 1500);

    
    setTimeout(() =>{
        //3. Computer will check again if it can play, reference (1.).
        computer_play_card(pile);        
    }, 4000);


    //4. Computer will end its turn.
    setTimeout(()=>{
        computer_end_turn();
        if(player.dutch){
            alert("Showing hands and total!");
            total_score_count();
            return;
        }
        button_dutch.style.animationName = "button_pop_in";
        button_dutch.style.pointerEvents = "initial";
    }, 5000);

};

let total_score_count = () => {
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

let player_choosing_own_card_to_give_to_computer = (event) =>{
    if(event.target.getAttribute("class") == null){
        button_end_turn.style.animationName = "button_pop_in";  
        if(!player_has_drawn){
            button_dutch.style.animationName = "button_pop_in";
            button_dutch.style.pointerEvents = "initial"; 
        }
        // document.querySelectorAll(".player_hand > img").forEach(e => {
        //     e.style.animationName = "none";
        // });
        for(let img = 0; img < player.num_of_cards; img++){
            player.visual_hand[img].style.animationName = "none";
        }
        player_hand_div.removeEventListener("click", player_choosing_own_card_to_give_to_computer);
        // document.querySelectorAll(".computer_hand > img").forEach(e => {
        //     e.style.pointerEvents = "initial";
        // });
        for(let img = 0; img < computer.num_of_cards; img++){
            computer.visual_hand[img].style.pointerEvents = "initial";
        }
        //Adding player's card to the computer's hand
        let index = null;
        for(let i = 0; i < player.num_of_cards; i++){
            if(player.visual_hand[i].getAttribute("src") == event.target.getAttribute("src")){
                index = i;
            };
        }
        let added_card = new Card(player.hand[index].card_type,
                                  player.hand[index].card_suit,
                                  player.hand[index].card_point,
                                  player.hand[index].card_ability);
        computer.hand.push(added_card);
        computer.known_hand.push(new Card(undefined, undefined, undefined, undefined));
        let added_visual_card = document.createElement("img");
        added_visual_card.setAttribute("src", player.visual_hand[index].getAttribute("src"));
        computer.visual_hand.push(added_visual_card);
        computer.num_of_cards += 1;
        computer_hand_div.appendChild(added_visual_card);
        added_visual_card.style.animationName = "switching_cards_in_hand";
        player.visual_hand[index].style.visibility = "hidden";
        for(let i = index+1; i < player.num_of_cards; i++){
            if(i%2 == 0){
                player.visual_hand[i].style.animationIterationCount = "1";
                player.visual_hand[i].style.animationName = "card_top_row_translation";
            }
            else{
                player.visual_hand[i].style.animationIterationCount = "1";
                player.visual_hand[i].style.animationName = "card_bottom_row_translation";
            }
        }
        added_visual_card.addEventListener("animationend", (e) =>{
            player_hand_div.removeChild(event.target);
            player.hand.splice(index, 1);
            player.visual_hand.splice(index, 1);
            player.num_of_cards -= 1; 
        }, {once: true}); 
    }
};

let player_choosing_switching_drawn_card = (event) => {
    document.querySelector(".container_button").style.display = "flex";
    for(let i = 0; i < player.num_of_cards; i++){
        player.visual_hand[i].style.animationName = "none";
    }
    let card_src = event.target.getAttribute("src");
    let switched_card_index = 0;
    if(card_src != null){
        for(let i = 0; i < player.num_of_cards; i++){
            if(player.visual_hand[i].getAttribute("src") == card_src){
                switched_card_index = i;
            }
        }
        switch_card(player, drawn_card, switched_card_index, pile);
        let temp_src = event.target.getAttribute("src");
        event.target.setAttribute("src", visual_card.getAttribute("src"));
        event.target.style.animationIterationCount = "1";
        event.target.style.animationName = "switching_cards_in_hand";
        visual_card.setAttribute("src", temp_src);
        player_card_action_prompt.removeChild(visual_card);
        container_player_card_action_prompt.style.display = "none";
        visual_card.style.transform = "rotate("+(45 - random_number(91))+"deg)";
        visual_card.style.animationName = "player_playing_card";
        pile_div.appendChild(visual_card);
        button_end_turn.style.display = "initial";
        button_end_turn.style.animationName = "button_pop_in";
        player_is_currently_drawing = false;
    }
};

let computer_end_turn = () => {
    computer_turn = false; 
    player_turn = true;
    deck_div.style.pointerEvents = "initial";
    player_hand_div.style.animationName = "user_flashing_turn";
    computer_hand_div.style.animationName = "none";
};