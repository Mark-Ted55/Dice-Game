var scores, roundScore, activePlayer,gamePlaying;
//Starting a new game ,function at the bottom
init();
var lastDice;

// ROLL button
document.querySelector(".btn-roll").addEventListener('click', function () {
    if(gamePlaying){
        // 1.   Random Number
  var dice1 = Math.floor(Math.random()* 6) + 1;
  var dice2 = Math.floor(Math.random()* 6) + 1;

  // 2. Display the result
  document.getElementById('dice-1').style.display='block';
  document.getElementById('dice-2').style.display='block';
  document.getElementById('dice-1').src= 'dice-'+ dice1 +'.png'
  document.getElementById('dice-2').src= 'dice-'+ dice2 +'.png'

  
  // Updating the round score IF the rolled number is NOT  a 1
  if (dice1 !==1 && dice2!==1) {
    //Add to the round score
    roundScore += dice1+ dice2;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
  /*
  // 3.Losing the score score if  6 is rolled twice in a row


  if(dice ===6 && lastDice===6){
    // Player looses score
    scores[activePlayer] = 0
    document.getElementById('score-'+activePlayer).textContent = '0'
    // Updating the round score IF the rolled number is NOT  a 1
  }else if (dice !==1) {
    //Add to the round score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
  lastDice = dice
  */
    }

});

// HOLD button
document.querySelector(".btn-hold").addEventListener("click", function () {
    if(gamePlaying){
        //Add CURRENT score to GLOBAL score
  scores[activePlayer] += roundScore;
  //Updating the UI
  document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
      var input = document.querySelector('.final-score').value
      var winningScore;
      if(input){
        winningScore = input;
      }else{
        winningScore = 100;
      }
  //Check if player won the game DEFAULT
  if (scores[activePlayer] >= winningScore) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
   document.getElementById('dice-1').style.display='none';
  document.getElementById('dice-2').style.display='none';
    document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner');
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove('active');
    document.querySelector('.btn-hold').style.display =  'none'
    document.querySelector('.btn-roll').style.display =  'none'
    document.querySelector('.btn-new').classList.add('center')
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
  document.getElementById('dice-1').style.display='none';
  document.getElementById('dice-2').style.display='none';
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
  document.getElementById('dice-1').style.display='none';
  document.getElementById('dice-2').style.display='none';
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
  document.querySelector('.btn-hold').style.display = 'block'
  document.querySelector('.btn-roll').style.display = 'block'
  document.querySelector('.btn-new').classList.remove('center')
}

