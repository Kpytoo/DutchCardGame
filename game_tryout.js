//This function is the game loop
const game_engine = () => {
    start_game(); //Starts the game by giving each player 4 cards
    let pile = new Card(undefined, undefined, undefined, undefined); //Create an object "pile" card, which is the last played card in the pile (starts empty - undefined)
    display_full_hand(computer, player, pile);

    //********Implement function that allows the player to see the two bottom cards, then the game starts. (Do it at the end)

    let dutch_called = false; //Keep track if someone has called "Dutch"
    let player_turn = true; //Keep track if player's turn
    let player_has_drawn = false; //Keep track if player has drawn during their turn
    let player_has_played = false; //Keep track if player has played during their turn
    let computer_turn = false; //Keep track if computer's turn
    

    //Player turn
    
    let drawn_card = new Card (); //Create a new card object that will be assigned the random drawn card
    draw_card(drawn_card); //Draw a random card and assign to drawn_card


};

//Launch the game
game_engine();





