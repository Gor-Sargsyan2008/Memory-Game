let playButtonEl = document.getElementById("play-button"); 
let centerEl = document.getElementById("center"); 
let figurejumpingEl = document.getElementById("figure-jumping"); 
let memoryGame = document.getElementById("memory-game");
let gameOverEl = document.getElementById("game-over");
let gameOverl = document.getElementById("gameOver");
let gobackEl = document.getElementById("goback")
let startCountEl = document.getElementById("start-count")
let countDownEL = document.getElementById("count-down")
let timeEl = document.getElementById("time")

memoryGame.style.display = "none";
gameOverEl.style.display = "none";
gameOverl.style.display = "none";

playButtonEl.addEventListener("click", chooseType);

function chooseType() { 
    centerEl.style.display = "none"
    figurejumpingEl.style.display = "none"
    gameOverEl.style.display = "none";
    gameOverl.style.display = "none";

    countDownEL.style.display = "block"
    let count = 3
    startCountEl.innerHTML = count
    let id = setInterval(function () {
        count--;
        startCountEl.innerHTML = count
        if (count < 0) {
            clearInterval(id)
            startCountEl.style.display = "none"
            memoryGame.style.display = "flex"
            figurejumpingEl.style.display = "block"
            
        }
    }, 1000)
} 

function gameOverLose(){
    memoryGame.style.display = "none";
    gameOverl.style.display = "block";
    gameOverEl.style.display = "none";
    centerEl.style.display = "none"
}   

startCountEl.addEventListener("click", choosestart) 
function choosestart() {
    let cyclesToDelay = 5;
    let time = 30;
    let startCountEl = document.getElementById('startCount'); 
    let memoryGame = document.getElementById('memoryGame'); 
    let timeEl = document.getElementById('time'); 

    setTimeout(() => {
        let idGame = setInterval(function () {
            time--;
            timeEl.innerHTML = time;

            if (time <= 0) {
                clearInterval(idGame);
                gameOverLose();
                
            }
        }, 1000); 
    }, cyclesToDelay * 1000); 
}

choosestart();


for (let i = 0; i < cardsData.length; i++) {
    let cards = document.createElement('div')
    cards.classList.add('memory-card')
    cards.setAttribute('data-framework', cardsData[i].data_framework)
    memoryGame.appendChild(cards)

    let imageFront = document.createElement('img')
    imageFront.classList.add('front-face')
    imageFront.src = cardsData[i].imageF
    cards.appendChild(imageFront)
}

const allCards = document.querySelectorAll('.memory-card');
allCards.forEach(card => card.addEventListener('click', flipCard));
let firstCard
let secondCard
let hasFlippedCard = false
let locked = false


function flipCard(){
    if(locked || this == firstCard) return
    this.classList.add('flip')
    
    if(!hasFlippedCard){
        hasFlippedCard = true
        firstCard = this
    }else {
        secondCard = this
        checkForMatch()
    }
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework == secondCard.dataset.framework
    isMatch? disableCards(): unFliipedCard()
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetCard()
}

function unFliipedCard(){
    locked = true
    setTimeout(()=>{
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetCard()
    }, 1000)

}

function resetCard(){
    locked = false
    hasFlippedCard = false
    firstCard = null
    secondCard = null
}

function shuffle(){
    allCards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos
    })
}
shuffle()

function fireworks() {
    const fireworksEl = document.createElement('div');
    fireworksEl.classList.add('fireworks');
    document.body.appendChild(fireworksEl);

    const colors = ['#ff7f50', '#ff1493', '#9370db', '#7cfc00', '#00bfff', '#ff4500'];
  
    setInterval(() => {
        const firework = document.createElement('span');
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        firework.style.left = Math.random() * 100 + 'vw';
        firework.style.animationDuration = Math.random() * 2 + 1 + 's';
        firework.style.animationTimingFunction = 'cubic-bezier(' + Math.random() + ', ' + Math.random() + ', ' + Math.random() + ', ' + Math.random() + ')';
        
        firework.classList.add('firework');
        fireworksEl.appendChild(firework);
        
        setTimeout(() => {
            firework.remove();
        }, 2000);
    }, 200);
}



function gameOver(){
    memoryGame.style.display = "none";
    gameOverEl.style.display = "block";
    gameOverl.style.display = "none";
    centerEl.style.display = "none"
    fireworks()
}

function checkGameEnd(){
    let matchedCards = document.querySelectorAll('.memory-card.flip');
    if(matchedCards.length === allCards.length){
        gameOver();
    }
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetCard()
    checkGameEnd();
}


