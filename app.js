/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScores, activePlayer, gamePlaying, looses;
init();

/**
 * @selector {string} btn-roll is the button for rolling the dice.
 * @type {click} is an event that eventListener will listen to when use click.
 * @callback {function}  is going to be called back by the eventListener.
 */
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        // 1. Generate random number between 1 and 6.
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the dice image based on the dice number.
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update the round score if the rolled dice is not equal to 1.
        if (dice1 !== 1 && dice2 !== 2){
            roundScores += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            // 4. If dice is 1, then change to second player.
            nextPlayer();
        }
    }
});

/**
 * @selector {string} btn-hold is the button for holding the game.
 * @type {click} is an event that eventListener will listen to when use click.
 * @callback {function}  is going to be called back by the eventListener.
 */
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying){

        let winScoreValue = document.getElementById('win_score').value;

        // 1. Add current score to global score.
        scores[activePlayer] += roundScores;

        // 2. Update the UI.
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. check if player won the game.
        if (!winScoreValue){
            winScoreValue = 100;
        }
        if (scores[activePlayer] >= winScoreValue){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else {
            // 4. Go to next player.
            nextPlayer();
        }
    }
});

/**
 * @selector {string} btn-new is the button for creating a new game.
 * @type {click} is an event that eventListener will listen to when use click.
 * @callback {function}  is going to be called back by the eventListener.
 */
document.querySelector('.btn-new').addEventListener('click', init);


/**
 * @function nextPlayer will change the player.
 */
function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = `${0}`;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    hideDice();
}

/**
 * @function init initialize variables.
 */
function init() {
    scores = [0 ,0]; // scores save player stores
    roundScores = 0; // roundScores save player round score
    activePlayer = 0; // activePlayer shows which player is playing
    gamePlaying = true; // the game state.

    // Dice is an image and will be hidden first.
    hideDice();

    // score-0, score-1, current-0, current-1 will set to zero initially.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Remove winner class when initialize the game.
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // Add active to the current player.
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}