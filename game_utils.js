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

const computer_hand_div = document.querySelector(".computer_hand"); //Where we are adding/removing visual cards
const player_hand_div = document.querySelector(".player_hand"); //Where we are adding/removing visual cards
const deck_div = document.querySelector(".deck");
const display_number_of_cards_in_deck = document.querySelector("span.display_number_of_cards_in_deck");


const deck_visual_card = document.createElement("img");
deck_visual_card.setAttribute("src", "CARDS\\back_side_.png");



//<---- Event listeners ---->

//**Drawing from the deck**
deck_div.addEventListener("click", (e)=>{
    if(num_of_cards_in_deck() == 46){
        alert("Nuh uh");
    }
    else{
        alert(num_of_cards_in_deck());
    }
});