const movesCounter = document.querySelector(".score-panel").querySelector(".moves");
let openCards = [];
matchedCards = 0;
let moves = 0;
let seconds = 0;
let minuts = 0;

function newGame(){
    openCards = [];
    matchedCards = 0;
    moves = 0;
    document.querySelector("#star1").style.display = "inline-block";
    document.querySelector("#star2").style.display = "inline-block";
    const deck = document.querySelector(".deck");
    const allCards = document.getElementById("deck").getElementsByClassName("card");
    const allCardsAr = Array.from(allCards);
    const shuffledCards = shuffle(allCardsAr);
    deck.innerHTML = "";
    for ( const card of shuffledCards){
        deck.appendChild(card);
    }
    addListener()
    timer()
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
    if (e.target.className === "card") {
        e.target.classList.add("show", "open");
        openCards.push(e.target);

    }if (openCards.length === 2){
        checkCards()
        deck.classList.add("noClick");
    }else {
    }
 }

 function checkCards(){
    moves++;
    movesCounter.innerHTML = moves;
    openCards[1].classList.add("show");
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        setTimeout(cardsMatch, 1000);
    }else if(openCards[0] != openCards[1].innerHTML) {
        setTimeout(notMatch, 1000);
        addListener()
    }
    if (moves === 10){removeStar1()}
    if (moves === 16){removeStar2()}
}   

function notMatch() {
    const nomatch = deck.querySelectorAll(".open");
    for (const i of nomatch) {
        i.classList.remove("open");
        i.classList.remove("show")
    }
    openCards = [];
    const decka = document.querySelector(".deck");
    decka.classList.remove("noClick");
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
    const decka = document.querySelector(".deck");
    decka.classList.remove("noClick");
    if (matchedCards === 8) {
        stopTimer();
    }
}

function removeStar1(){
    const star1 = document.querySelector("#star1")
    star1.style.display = "none";
}

function removeStar2(){
    const star2 = document.querySelector("#star2")
    star2.style.display = "none";
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

function timer(){
    
    timerOn = setInterval(addTimer, 1000);
        
    function addTimer(){
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minuts++
    }
    if (seconds < 10) {
        console.log(minuts+":0"+seconds)
    }else {
        console.log(minuts+":"+seconds)
    }

}
}

function stopTimer(){
    clearInterval(timerOn);
    console.log("your time is: "+minuts+":"+seconds)
}
newGame()
restartListnere()
