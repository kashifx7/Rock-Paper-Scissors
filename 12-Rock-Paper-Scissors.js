
let score = JSON.parse(localStorage.getItem('score'));


if (score === null) {
    score = {
        wins: 0, losses: 0,
        ties: 0
    };
}



updateScoreElement();

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML =
        `Win : ${score.wins} , Loss : ${score.losses} , Tie : ${score.ties}`;

}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){

    if(!isAutoPlaying){
// setInterval returns an id 
        intervalId =    setInterval(function( ) {
            const playerMove = pickCompMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
    
}



//computers picking move
function pickCompMove() {
    const randNum = Math.random();
    let compMove = '';
    if (randNum >= 0 && randNum <= 1 / 3) {
        compMove = 'Rock';
    }
    else if (randNum > 1 / 3 && randNum <= 2 / 3) {
        compMove = 'Paper';
    }
    else {
        compMove = 'Scissors';
    }

    return compMove;
}

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r' ){
        playGame('Rock');
    }
    else if(event.key === 'p'){
        playGame('Paper');
    }
    else if(event.key === 's'){
        playGame('Scissors');
    }
});

document.querySelector('.js-rock-btn').addEventListener(
    'click',() => {
        playGame('Rock');
    }
);

document.querySelector('.js-paper-btn').addEventListener(
    'click',() => {
        playGame('Paper');
    }
);

document.querySelector('.js-scissors-btn').addEventListener(
    'click',() => {
        playGame('Scissors');
    }
);


// evaluating result based on user
function playGame(playerMove) {
    let compMove = pickCompMove();
    let result = '';

    if (playerMove === 'Rock') {

        if (compMove === 'Rock') {
            result = 'Tie';
        }
        else if (compMove === 'Paper') {
            result = 'You Lost';
        }
        else {
            result = 'You Won';
        }


    }
    else if (playerMove === 'Paper') {
        if (compMove === 'Rock') {
            result = 'You Won';
        }
        else if (compMove === 'Paper') {
            result = 'Tie';
        }
        else {
            result = 'You Lost';
        }
    }
    else {

        if (compMove === 'Rock') {
            result = 'You Lost';
        }
        else if (compMove === 'Paper') {
            result = 'You Won';
        }
        else {
            result = 'Tie';
        }
    }

    if (result === 'You Won')
        score.wins++;
    else if (result === 'You Lost')
        score.losses++;
    else score.ties++;


    updateScoreElement();


    document.querySelector('.js-result').innerHTML
        = result;

    document.querySelector('.js-moves').innerHTML
        = `
        You  <img class="move-icon" src="img/${playerMove}.png" alt="Rock"> - 
    <img class="move-icon" src="img/${compMove}.png" alt="Rock"> Computer
        `;


    // alert(`you chose ${playerMove} , computer chose ${compMove} , ${result}
    // \nWin : ${score.wins} , Loss : ${score.losses} , Tie : ${score.ties}`);

    const jsonScore = JSON.stringify(score);
    localStorage.setItem('score', jsonScore);


}

//reset function
function resetScore() {
    score.losses = 0;
    score.wins = 0;
    score.ties = 0;
    // alert('Score is now Zero You have Fresh Start');

    updateScoreElement();
    // deleting items from local storege also
    localStorage.removeItem('score');
}


