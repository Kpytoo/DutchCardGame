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
    visual_hand: [], //Visual hand which holds card <img>s of the respective card in the hand 
    num_of_cards: 0, //Number of cards
    dutch: false, //If dutch was called
};

//Create player object
const player = {
    hand: [], //Actual hand of the player
    visual_hand: [], //Visual hand which holds card <img>s of the respective card in the hand
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

            const computer_hand_div = document.querySelector(".computer_hand"); //NEW
            const player_hand_div = document.querySelector(".player_hand"); //NEW
            let visual_card; //NEW
            let card_name_visual; //NEW

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
                visual_card.setAttribute("width", "100px"); //NEW
                visual_card.setAttribute("height", "45%"); //NEW
                
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

    //Display starting hand to player (reveals only 2 cards)
    for(let i = 0; i < player.num_of_cards; i++){
        if(i == 1 || i == 3){
            console.log("-----\n|"+player.hand[i].card_type+"|\n|"+player.hand[i].card_suit+"|\n-----\n"+
            "Points: "+player.hand[i].card_point+"\n"+
            "Ability: "+player.hand[i].card_ability); 
        }
        else{
            console.log("-----\n|CARD "+ (i+1) +"|\n-----");
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



//This function is the game loop
const game_engine = () => {
    start_game(); //Starts the game by giving each player 4 cards
    let pile = new Card(undefined, undefined, undefined, undefined);
    display_full_hand(computer, player, pile);

    //Implement function that allows the player to see the two bottom cards, then the game starts. (Do it at the end)

    
};

//Launch the game
game_engine();


//*************TESTING AREA



