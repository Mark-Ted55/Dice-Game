var scores, roundScore, activePlayer,gamePlaying;
//Starting a new game ,function at the bottom
init();

// ROLL button
document.querySelector(".btn-roll").addEventListener('click', function () {
    if(gamePlaying){
        // 1.   Random Number
  var dice = Math.floor(Math.random()* 6) + 1;

  // 2. Display the result
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  // 3. Updating the round score IF the rolled number is NOT  a 1
  if (dice > 1) {
    //Add to the round score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
    }

});

// HOLD button
document.querySelector(".btn-hold").addEventListener("click", function () {
    if(gamePlaying){
        //Add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore;
  //Updating the UI
  document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

  //Check if player won the game
  if (scores[activePlayer] >= 100) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner');
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove('active');
    gamePlaying = false
 }else {
    nextPlayer();
  }
    }
});

//Next Player function
function nextPlayer() {
  //Go to Next Player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById('current-0').textContent = "0";
  document.getElementById('current-1').textContent = "0";
  document.querySelector('.player-0-panel').classList.toggle("active");
  document.querySelector('.player-1-panel').classList.toggle("active");
  //Hiding the dice
  document.querySelector(".dice").style.display = "none";
}

//New Game Button
document.querySelector(".btn-new").addEventListener('click', init);
//When we BEGIN the GAME and when we press NEW Game button
//Initialize function
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  //Hiding the dice
  document.querySelector(".dice").style.display = "none";
  //Setting the scores to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  //Removing the winner element
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  //Player 1 to start
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
