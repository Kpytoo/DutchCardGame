//This function is the game loop
// const game_engine = () => {
//     start_game(); //Starts the game by giving each player 4 cards
//     let pile = new Card(undefined, undefined, undefined, undefined); //Create an object "pile" card, which is the last played card in the pile (starts empty - undefined)
//     display_full_hand(computer, player, pile);

//     //********Implement function that allows the player to see the two bottom cards, then the game starts. (Do it at the end)

//     let dutch_called = false; //Keep track if someone has called "Dutch"
//     let player_turn = true; //Keep track if player's turn
//     let player_has_drawn = false; //Keep track if player has drawn during their turn
//     let player_has_played = false; //Keep track if player has played during their turn
//     let computer_turn = false; //Keep track if computer's turn
    

//     //Player turn
//     if(player_turn){

//         player_hand_div.style.animationName = "user_flashing_turn";

//         //**Drawing from the deck**
//         deck_div.addEventListener("click", (e)=>{
//             if(player_has_drawn){
//                 alert("You already drew!");
//             }
//             else{
//                 let drawn_card = new Card (); //Create a new card object that will be assigned the random drawn card
//                 draw_card(drawn_card);
//                 console.log(drawn_card);
//                 visual_card = document.createElement("img");
//                 visual_card.setAttribute("src", ("CARDS\\" + drawn_card.card_suit + "_" + drawn_card.card_type + ".png"));
//                 container_player_card_action_prompt.style.display = "initial";
//                 player_card_action_prompt.appendChild(visual_card);
//                 // player_has_drawn = true;
//             }
//         });
//     }




// };

//Launch the game
// game_engine();

start_game(); //Starts the game by giving each player 4 cards
let pile = new Card(undefined, undefined, undefined, undefined); //Create an object "pile" card, which is the last played card in the pile (starts empty - undefined)
let drawn_card = new Card (); //Create a new card object that will be assigned the random drawn card
display_full_hand(computer, player, pile);
//********Implement function that allows the player to see the two bottom cards, then the game starts. (Do it at the end)

let dutch_called = false; //Keep track if someone has called "Dutch"
let player_turn = true; //Keep track if player's turn
let player_has_drawn = false; //Keep track if player has drawn during their turn
let player_is_currently_drawing = false;
let player_has_played = false; //Keep track if player has played during their turn
let computer_turn = false; //Keep track if computer's turn
let player_has_switched_cards = false;

//Player turn
player_hand_div.style.animationName = "user_flashing_turn";
console.log(computer.known_hand);
//**Drawing from the deck**
deck_div.addEventListener("click", (e)=>{
    if(!player_turn){
        alert("Not your turn!");
        return;
    }
    else if(player.num_of_cards == 0){
        alert("Can't draw while empty handed!");
        return;
    }
    else if(player_has_drawn){
        alert("You already drew!");
    }
    else{
        player_is_currently_drawing = true;
        draw_card(drawn_card);
        visual_card = document.createElement("img");
        visual_card.setAttribute("src", ("CARDS\\" + drawn_card.card_suit + "_" + drawn_card.card_type + ".png"));
        container_player_card_action_prompt.style.display = "initial";
        player_card_action_prompt.appendChild(visual_card);
        player_has_drawn = true;
    }
    button_dutch.style.animationName = "button_pop_out";
    button_dutch.style.pointerEvents = "none";
    display_full_hand(computer, player, pile);
});

//**Playing or switching the drawn card**
player_card_action_prompt.addEventListener("click", (e) => {
    if(e.target.getAttribute("class") == "play"){
        play_card_on_pile(player, drawn_card, pile, false);
        player_card_action_prompt.removeChild(visual_card);
        container_player_card_action_prompt.style.display = "none";
        visual_card.style.transform = "rotate("+(45 - random_number(91))+"deg)";
        visual_card.style.animationName = "player_playing_card";
        pile_div.appendChild(visual_card);
        button_end_turn.style.display = "initial";
        button_end_turn.style.animationName = "button_pop_in";
        player_is_currently_drawing = false;
    };
    if(e.target.getAttribute("class") == "switch"){
        document.querySelector(".container_button").style.display = "none";
        document.querySelectorAll(".player_hand > img").forEach(e => {
            e.style.animationIterationCount = "infinite";
            e.style.animationName = "switching_shaking_cards";
        });
        player_hand_div.addEventListener("click", (event) =>{
            document.querySelector(".container_button").style.display = "flex";
            document.querySelectorAll(".player_hand > img").forEach(e => {
                e.style.animationName = "none";
            });
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
        }, { once: true });
    };
    display_full_hand(computer, player, pile);
});


//**Ending player's turn and playing the computer's turn**
button_end_turn.addEventListener("click", (e) => {
    if(player_has_drawn || player.dutch){
        console.log(player_has_drawn);
        console.log(player.dutch);
        player_has_drawn = false;
        player_turn = false;
        computer_turn = true;
        player_hand_div.style.animationName = "none";
        button_end_turn.style.animationName = "button_pop_out";
        deck_div.style.pointerEvents = "none";
        computer_hand_div.style.animationName = "user_flashing_turn";
        computer_playing_turn();
        setTimeout(()=>{
            deck_div.style.pointerEvents = "initial";
            player_hand_div.style.animationName = "user_flashing_turn";
            computer_hand_div.style.animationName = "none";
            button_dutch.style.animationName = "button_pop_in";
            button_dutch.style.pointerEvents = "initial";
        }, 4000);
        display_full_hand(computer, player, pile);
    }
});

//Player playing a card from their hand
player_hand_div.addEventListener("dblclick", (e) =>{
    if(pile.card_type == undefined){
        return;
    }
    if(!player_turn){
        return;
    }
    if(player_is_currently_drawing){
        return;
    }
    play_card(pile, e);
});

//Player pressing the "Dutch!" button
button_dutch.addEventListener("click", (e) =>{
    alert("DUTCH!");
});