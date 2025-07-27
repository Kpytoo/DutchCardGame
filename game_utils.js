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

let visual_card; //NEW
let card_name_visual; //NEW
let pile = new Card(undefined, undefined, undefined, undefined); //Create an object "pile" card, which is the last played card in the pile (starts empty - undefined)
let drawn_card = new Card (); //Create a new card object that will be assigned the random drawn card
let player_turn = true; //Keep track if player's turn
let player_has_drawn = false; //Keep track if player has drawn during their turn
let player_is_currently_drawing = false;
let player_has_played = false; //Keep track if player has played during their turn
let computer_turn = false; //Keep track if computer's turn
let player_has_switched_cards = false;

const computer_hand_div = document.querySelector(".computer_hand"); //Where we are adding/removing visual cards
const player_hand_div = document.querySelector(".player_hand"); //Where we are adding/removing visual cards
const deck_div = document.querySelector(".deck");
const pile_div = document.querySelector(".pile");
const button_end_turn = document.querySelector(".button_end_turn");
const button_dutch = document.querySelector("button.dutch");

const display_number_of_cards_in_deck = document.querySelector("span.display_number_of_cards_in_deck");

const deck_visual_card = document.createElement("img");
deck_visual_card.setAttribute("src", "CARDS\\back_side_.png");

const container_player_card_action_prompt = document.querySelector(".container_player_card_action_prompt");
const player_card_action_prompt = document.querySelector(".player_card_action_prompt");
const container_computer_card_action = document.querySelector(".container_computer_card_action");
const computer_card_action = document.querySelector(".computer_card_action");