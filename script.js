const card = document.createElement("img"); //This creates the element
card.setAttribute("src", "back_side_.png"); //This sets its attributes
card.setAttribute("width", "100px");
card.setAttribute("height", "45%");

const card2 = document.createElement("img"); //This creates the element
card2.setAttribute("src", "back_side_.png");
card2.setAttribute("width", "100px");
card2.setAttribute("height", "45%");
// document.body.appendChild(card); //This appends the element to the page

const card3 = document.createElement("img"); //This creates the element
card3.setAttribute("src", "back_side_.png"); //This sets its attributes
card3.setAttribute("width", "100px");
card3.setAttribute("height", "45%");

const card4 = document.createElement("img"); //This creates the element
card4.setAttribute("src", "back_side_.png"); //This sets its attributes
card4.setAttribute("width", "100px");
card4.setAttribute("height", "45%");

const card5 = document.createElement("img"); //This creates the element
card5.setAttribute("src", "back_side_.png"); //This sets its attributes
card5.setAttribute("width", "100px");
card5.setAttribute("height", "45%");

const carddeck = document.createElement("img"); //This creates the element
carddeck.setAttribute("src", "back_side_.png");
carddeck.setAttribute("width", "100px");
carddeck.setAttribute("height", "200px");
carddeck.style.transform = "rotate(-90deg)";

const player_hand = document.querySelector(".player_hand");
player_hand.appendChild(card);
player_hand.appendChild(card2);
player_hand.appendChild(card3);
player_hand.appendChild(card4);

const deck = document.querySelector(".deck");
deck.appendChild(carddeck);

card.addEventListener("mouseenter", (e) => {
    if(card.getAttribute("src") == "back_side_.png"){
        card.setAttribute("src", "diamonds_three.png");
    }
    else{
        card.setAttribute("src", "back_side_.png");
    }
});

card2.addEventListener("mouseenter", (e) => {
    if(card2.getAttribute("src") == "back_side_.png"){
        card2.setAttribute("src", "diamonds_three.png");
    }
    else{
        card2.setAttribute("src", "back_side_.png");
    }
});

card3.addEventListener("mouseenter", (e) => {
    if(card3.getAttribute("src") == "back_side_.png"){
        card3.setAttribute("src", "diamonds_three.png");
    }
    else{
        card3.setAttribute("src", "back_side_.png");
    }
});

card4.addEventListener("mouseenter", (e) => {
    if(card4.getAttribute("src") == "back_side_.png"){
        card4.setAttribute("src", "diamonds_three.png");
    }
    else{
        card4.setAttribute("src", "back_side_.png");
    }
});

carddeck.addEventListener("mouseenter", (e) => {
    if(carddeck.getAttribute("src") == "back_side_.png"){
        carddeck.setAttribute("src", "diamonds_three.png");
    }
    else{
        carddeck.setAttribute("src", "back_side_.png");
    }
});