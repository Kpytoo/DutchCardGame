start_game(); //Starts the game by giving each player 4 cards
display_full_hand(computer, player, pile);
//********Implement function that allows the player to see the two bottom cards, then the game starts. (Do it at the end)



//Player turn
player_hand_div.style.animationName = "user_flashing_turn";
// console.log(computer.known_hand);

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
        draw_card(drawn_card);
        player_is_currently_drawing = true;
        player_has_drawn = true;
        deck_div.style.pointerEvents = "none";
        visual_card = document.createElement("img");
        visual_card.setAttribute("src", ("CARDS\\" + drawn_card.card_suit + "_" + drawn_card.card_type + ".png"));
        container_player_card_action_prompt.style.display = "initial";
        player_card_action_prompt.appendChild(visual_card); 
        button_dutch.style.animationName = "button_pop_out";
        button_dutch.style.pointerEvents = "none"; 
        display_full_hand(computer, player, pile);
    }
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
        for(let i = 0; i < player.num_of_cards; i++){
            player.visual_hand[i].style.animationIterationCount = "infinite";
            player.visual_hand[i].style.animationName = "switching_shaking_cards";
        }
        player_hand_div.addEventListener("click", player_choosing_switching_drawn_card, { once: true });
    };
    display_full_hand(computer, player, pile);
});

//**Player deciding to switch or not after playing a ten
container_button_player_playing_ten.addEventListener("click", (e) => {
    if(e.target.getAttribute("class") == "switch_ten"){
        container_button_player_playing_ten.style.display = "none";
        for(let img = 0; img < player.num_of_cards; img++){
            player.visual_hand[img].style.pointerEvents = "initial";
        }
        for(let i = 0; i < player.num_of_cards; i++){
            player.visual_hand[i].style.animationIterationCount = "infinite";
            player.visual_hand[i].style.animationName = "switching_shaking_cards";
        }
        player_hand_div.addEventListener("click", player_playing_a_ten);
    }
    if(e.target.getAttribute("class") == "no_switch_ten"){
        container_button_player_playing_ten.style.display = "none";
        button_end_turn.style.animationName = "button_pop_in";
        button_end_turn.style.pointerEvents = "initial"; 
        if(!player_has_drawn){
            button_dutch.style.animationName = "button_pop_in";
            button_dutch.style.pointerEvents = "initial";
            button_end_turn.style.animationName = "button_pop_out";
            deck_div.style.pointerEvents = "initial";
        }
        for(let img = 0; img < computer.num_of_cards; img++){
            computer.visual_hand[img].style.pointerEvents = "initial";
        }
        for(let img = 0; img < player.num_of_cards; img++){
            player.visual_hand[img].style.pointerEvents = "initial";
        }
    }
});


//**Ending player's turn and playing the computer's turn**
button_end_turn.addEventListener("click", (e) => {
    if(player_has_drawn && !computer.dutch){
        player_has_drawn = false;
        player_turn = false;
        computer_turn = true;
        player_hand_div.style.animationName = "none";
        button_end_turn.style.animationName = "button_pop_out";
        deck_div.style.pointerEvents = "none";
        computer_hand_div.style.animationName = "user_flashing_turn";
        computer_playing_turn();
        display_full_hand(computer, player, pile);
    }
    else{
        player_hand_div.style.animationName = "none";
        button_end_turn.style.animationName = "button_pop_out";
        deck_div.style.pointerEvents = "none";
        alert("Showing hands and total!");
        total_score_count();
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

//Player playing a card from the computer's hand
computer_hand_div.addEventListener("dblclick", (e) =>{
    if(pile.card_type == undefined){
        return;
    }
    if(!player_turn){
        return;
    }
    if(player_is_currently_drawing){
        return;
    }
    play_card_from_computer(pile, e);
});

//Player pressing the "Dutch!" button
button_dutch.addEventListener("click", (e) =>{
    if(!computer.dutch){
        document.querySelector("div.player_dutch").style.display = "initial";
        player.dutch = true;
        player_turn = false;
        computer_turn = true;
        player_hand_div.style.animationName = "none";
        button_end_turn.style.animationName = "button_pop_out";
        deck_div.style.pointerEvents = "none";
        computer_hand_div.style.animationName = "user_flashing_turn";
        button_dutch.style.animationName = "button_pop_out";
        button_dutch.style.pointerEvents = "none";
        computer_playing_turn();
        // setTimeout(()=>{
        //     alert("Showing hands and total!");
        //     total_score_count();
        // }, 5000);        
    }
});

button_game_rules.addEventListener("click", (e) => {
    container_game_rules_information.style.display = "flex";
    container_game_rules_information.style.animationName = "button_pop_in";
});

button_exit_rules.addEventListener("click", (e) => {
    container_game_rules_information.style.animationName = "button_pop_out";
    container_game_rules_information.addEventListener("animationend", (e) =>{
        container_game_rules_information.style.display = "none";   
    }, {once: true});
});