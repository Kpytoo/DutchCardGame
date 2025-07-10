const card = document.createElement("img"); //This creates the element
card.setAttribute("src", "CARDS/back_side_.png"); //This sets its attributes
card.setAttribute("width", "100px");
card.setAttribute("height", "45%");

const card2 = document.createElement("img"); //This creates the element
card2.setAttribute("src", "CARDS/back_side_.png");
card2.setAttribute("width", "100px");
card2.setAttribute("height", "45%");
// document.body.appendChild(card); //This appends the element to the page

const card3 = document.createElement("img"); //This creates the element
card3.setAttribute("src", "CARDS/back_side_.png"); //This sets its attributes
card3.setAttribute("width", "100px");
card3.setAttribute("height", "45%");

const card4 = document.createElement("img"); //This creates the element
card4.setAttribute("src", "CARDS/back_side_.png"); //This sets its attributes
card4.setAttribute("width", "100px");
card4.setAttribute("height", "45%");

const card5 = document.createElement("img"); //This creates the element
card5.setAttribute("src", "CARDS/back_side_.png"); //This sets its attributes
card5.setAttribute("width", "100px");
card5.setAttribute("height", "45%");

const card6 = document.createElement("img"); //This creates the element
card6.setAttribute("src", "CARDS/back_side_.png"); //This sets its attributes
card6.setAttribute("width", "100px");
card6.setAttribute("height", "45%");

const card7 = document.createElement("img"); //This creates the element
card7.setAttribute("src", "CARDS/back_side_.png"); //This sets its attributes
card7.setAttribute("width", "100px");
card7.setAttribute("height", "45%");

const card8 = document.createElement("img"); //This creates the element
card8.setAttribute("src", "CARDS/back_side_.png"); //This sets its attributes
card8.setAttribute("width", "100px");
card8.setAttribute("height", "45%");

const card9 = document.createElement("img"); //This creates the element
card9.setAttribute("src", "CARDS/back_side_.png"); //This sets its attributes
card9.setAttribute("width", "100px");
card9.setAttribute("height", "45%");

const carddeck = document.createElement("img"); //This creates the element
carddeck.setAttribute("src", "CARDS/back_side_.png");
carddeck.setAttribute("width", "100px");
carddeck.setAttribute("height", "200px");
carddeck.style.transform = "rotate(-90deg)";

const player_hand = document.querySelector(".player_hand");
// player_hand.appendChild(card);
// player_hand.appendChild(card2);
// player_hand.appendChild(card3);
// player_hand.appendChild(card4);
// player_hand.appendChild(card5);
// player_hand.appendChild(card6);
// player_hand.appendChild(card7);
// player_hand.appendChild(card8);
// player_hand.appendChild(card9);


const deck = document.querySelector(".deck");
deck.appendChild(carddeck);

card.addEventListener("mouseenter", (e) => {
    if(card.getAttribute("src") == "CARDS/back_side_.png"){
        card.setAttribute("src", "CARDS/diamonds_three.png");
    }
    else{
        card.setAttribute("src", "CARDS/back_side_.png");
    }
});

card2.addEventListener("mouseenter", (e) => {
    if(card2.getAttribute("src") == "CARDS/back_side_.png"){
        card2.setAttribute("src", "CARDS/diamonds_three.png");
    }
    else{
        card2.setAttribute("src", "CARDS/back_side_.png");
    }
});

card3.addEventListener("mouseenter", (e) => {
    if(card3.getAttribute("src") == "CARDS/back_side_.png"){
        card3.setAttribute("src", "CARDS/diamonds_three.png");
    }
    else{
        card3.setAttribute("src", "CARDS/back_side_.png");
    }
});

card4.addEventListener("mouseenter", (e) => {
    if(card4.getAttribute("src") == "CARDS/back_side_.png"){
        card4.setAttribute("src", "CARDS/diamonds_three.png");
    }
    else{
        card4.setAttribute("src", "CARDS/back_side_.png");
    }
});

carddeck.addEventListener("mouseenter", (e) => {
    if(carddeck.getAttribute("src") == "CARDS/back_side_.png"){
        carddeck.setAttribute("src", "CARDS/diamonds_three.png");
    }
    else{
        carddeck.setAttribute("src", "CARDS/back_side_.png");
    }
});