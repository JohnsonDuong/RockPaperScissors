//randomly choose a weapon for the opponent
function computerPlay() {
    const randNum = Math.floor(Math.random() * 10); // creates a random integer from 1 to 9

    if (randNum <= 3) {
        document.querySelector('.disabled.rock').classList.add('selected');
        document.querySelector('.disabled.paper').classList.remove('selected');
        document.querySelector('.disabled.scissors').classList.remove('selected');
        return "rock";
    } else if (randNum > 3 && randNum <= 6) {
        document.querySelector('.disabled.paper').classList.add('selected');
        document.querySelector('.disabled.rock').classList.remove('selected');
        document.querySelector('.disabled.scissors').classList.remove('selected');
        return "paper";
    } else {
        document.querySelector('.disabled.scissors').classList.add('selected');
        document.querySelector('.disabled.paper').classList.remove('selected');
        document.querySelector('.disabled.rock').classList.remove('selected');
        return "scissors";
    }
}

//determine who wins the round
function playRound(playerSelection, computerSelection) {
    switch (playerSelection[0] + computerSelection[0]) {
        case "rr":
            return "tie";
            break;
        case "rp":
            return "lose";
            break;
        case "rs":
            return "win";
            break;
        case "pr":
            return "win";
            break;
        case "pp":
            return "tie";
            break;
        case "ps":
            return "lose";
            break;
        case "sr":
            return "lose";
            break;
        case "sp":
            return "win";
            break;
        case "ss":
            return "tie";
            break;
    }
}

let roundCount = 1;
let scorePlayer = scoreOpponent = 0;

//show modal screen at the end of the game
function endGame(outcome) {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.add('show');
    document.querySelector('.message').textContent = `You ${outcome}!`;

    document.getElementById('play-again').addEventListener('click', () => {
        modalContainer.classList.remove('show');
        
        //reset variables
        roundCount = 0;
        scorePlayer = scoreOpponent = 0;
        document.querySelector('#round').textContent = `Round ${roundCount}`;
        document.querySelector('.score-player').textContent = `Score: ${scorePlayer}`;
        document.querySelector('.score-opponent').textContent = `Score: ${scoreOpponent}`;

        //reset selection
        document.querySelector('.player-button.rock').classList.remove('selected');
        document.querySelector('.player-button.paper').classList.remove('selected');
        document.querySelector('.player-button.scissors').classList.remove('selected');
        document.querySelector('.disabled.rock').classList.remove('selected');
        document.querySelector('.disabled.paper').classList.remove('selected');
        document.querySelector('.disabled.scissors').classList.remove('selected');
        
    });
}

//control mechanics of the game
function game() {
    
    const playerButtons = document.querySelectorAll('.player-button');

    //assign event listeners to each player selection button
    playerButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            
            //clear selected button style for all player buttons
            playerButtons.forEach((button) => {button.classList.remove('selected')});

            //apply selected button style to selected player button
            e.target.classList.add('selected');

            const playerSelection = e.target.classList[1];
            const computerSelection = computerPlay();

            //update score if player wins
            if (playRound(playerSelection, computerSelection) == "win") {
                scorePlayer += 1;
                document.querySelector('.score-player').textContent = `Score: ${scorePlayer}`;
            }

            //update score if player loses
            else if (playRound(playerSelection, computerSelection) == "lose") {
                scoreOpponent +=1 ;
                document.querySelector('.score-opponent').textContent = `Score: ${scoreOpponent}`;
            }

            //increment the round count
            roundCount += 1;
            document.querySelector('#round').textContent = `Round ${roundCount}`;

            if (scorePlayer==5) {
                endGame('won');
            }     

            if (scoreOpponent==5) {
                endGame('lost');
            }
        });
    });
}

//call the game to start
game();