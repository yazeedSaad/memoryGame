const movesCounter = document.querySelector(".score-panel").querySelector(".moves");
let openCards = [];
matchedCards = 0;
let moves = 0;

function newGame(){
    openCards = [];
    matchedCards = 0;
    moves = 0;
    const deck = document.querySelector(".deck");
    const allCards = document.getElementById("deck").getElementsByClassName("card");
    const allCardsAr = Array.from(allCards);
    const shuffledCards = shuffle(allCardsAr);
    deck.innerHTML = "";
    for ( const card of shuffledCards){
        deck.appendChild(card);
    }
    addListener()
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addListener() {
    deck.addEventListener("click", showCard);
}
function removeListener(){
    deck.removeEventListener("click", showCard);
}

function showCard(e) {
    removeListener()
    if (e.target.className === "card") {
        e.target.classList.add("show", "open");
        openCards.push(e.target);

    }if (openCards.length === 2){
        checkCards()
    }else {
        addListener();
    }
 }

 function checkCards(){
    moves++;
    movesCounter.innerHTML = moves;
    removeListener()
    openCards[1].classList.add("show");
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        setTimeout(cardsMatch, 1000);
    }else if(openCards[0] != openCards[1].innerHTML) {
        setTimeout(notMatch, 1000);
        addListener()
    }
}

function notMatch() {
    const nomatch = deck.querySelectorAll(".open");
    for (const i of nomatch) {
        i.classList.remove("open");
        i.classList.remove("show")
    }
    openCards = [];
}


function cardsMatch(){
    const matched = deck.querySelectorAll(".open");
    for (const i of matched) {
        i.classList.remove("open");
        i.classList.remove("show");
        i.classList.add("match")
    };
    matchedCards++
    openCards = [];
    addListener()
}

function restartGmae(){
    movesCounter.innerHTML = 0;
    const opening = deck.querySelectorAll(".open, .match");
    for (const i of opening) {
        i.classList.remove("open");
        i.classList.remove("show");
        i.classList.remove("match");
    }
    newGame()
}

function restartListnere(){

    const restart = document.querySelector(".score-panel").querySelector(".restart");
    restart.addEventListener("click", restartGmae)
}
newGame()
restartListnere()
