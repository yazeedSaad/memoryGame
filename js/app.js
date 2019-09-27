const movesCounter = document.querySelector(".score-panel").querySelector(".moves");
let openCards = [];
matchedCards = 0;
let moves = 0;
let seconds = 0;
let minuts = 0;
gameTimer = "off";

//  start new game 
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
    if (gameTimer ==="off"){
        gameTimer = "on"
        timer()

    }

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

// listener  for the click on the cards 
function addListener() {
    deck.addEventListener("click", showCard);
}
function removeListener(){
    deck.removeEventListener("click", showCard);
}

// function to open the card when clicking 
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

// compare cards and keep track of the moves to change the stars based on them
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
    if (moves === 20){removeStar1()}
    if (moves === 30){removeStar2()}
}   

// if the open cards didn't match close the cards  
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

// if the open cards match keep them open and end the game when all the cards open 
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
        openModal();
    }
}

// remove a star 
function removeStar1(){
    const star1 = document.querySelector("#star1")
    star1.style.display = "none";
}

// remove the second star
function removeStar2(){
    const star2 = document.querySelector("#star2")
    star2.style.display = "none";
}

// when the restart btn clicked start new game 
function restartGame(){
    movesCounter.innerHTML = 0;
    const opening = deck.querySelectorAll(".open, .match");
    for (const i of opening) {
        i.classList.remove("open");
        i.classList.remove("show");
        i.classList.remove("match");
    }
    seconds = 0;
    minuts = 0;
//   place the stars in the score-panel again 
    const starsContainer = document.querySelector("#stars-container")
    starsContainer.appendChild(document.querySelector("#stars"))
    newGame()
}

// listnere to the restart btn 
function restartListnere(){
    const restart = document.querySelector(".score-panel").querySelector(".restart");
    restart.addEventListener("click", restartGame)
}

// timer functionalty 
function timer(){
    if (gameTimer === "on"){
        timerOn = setInterval(addTimer, 1000);}      
    function addTimer(){
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minuts++
    }
    const timerDiv = document.querySelector(".timer")
    timerDiv.innerHTML = minuts+":"+seconds;
   
}
}

// show the timer result in the modal after the game is finish 
function displayTime() {
    if (seconds < 10) {
        return minuts+":0"+seconds
    }else {
        return minuts+":"+seconds
    }

}

// stop the timer when the game is over 
function stopTimer(){
    clearInterval(timerOn);
}

// when the game is over open modal with the final results 
function openModal(){
    const modal = document.getElementById("modal")
    const finalMoves = document.getElementById("movesOut")
    const finalTime = document.getElementById("timeOut")
    const finalStars = document.getElementById("playerStars")
    const playAgainBtn = document.getElementById("playAgain")
    modal.style.display = 'block';
    finalMoves.innerHTML = moves;
    finalTime.innerHTML = displayTime()
    finalStars.appendChild(document.querySelector("#stars"));
    gameTimer = "off";
    playAgainBtn.addEventListener("click", function(){
        modal.style.display = 'none';
        restartGame();
    })
}

// when the player didn't chose play again close the modal
function endGame(){
    const modal = document.getElementById("modal")
    const endGamebtn = document.querySelector("#end-game");
    endGamebtn.addEventListener("click", function(){
        modal.style.display = "none";
    })
}
newGame()
restartListnere()
endGame()
