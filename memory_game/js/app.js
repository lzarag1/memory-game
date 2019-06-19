/*
 * Create a stopwatch object
 */
var timer = document.getElementById('timer');
var watch = new Stopwatch(timer);

/*
 * Start the timer when the user starts playing
 */
function startTimer() {
  if (!watch.isOn) {
    watch.start();
  }
}

/*
 * Restart the game
 */
document.querySelector('.fa-repeat').addEventListener('click', (e) => {
  watch.reset();
});

/*
 * Create a list that holds all of your cards
 */
var deck = document.getElementsByClassName('card');
var re_shuffle = document.createDocumentFragment();

for (card of deck) {
   re_shuffle.appendChild(card.cloneNode(true));
}

 /*
  * Remove all cards from page
  */
for (let i=0; i < 16; i++) {
    var card = document.querySelector('.card');
    card.parentElement.removeChild(card);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 */
 deck = document.querySelector('.deck');
 re_shuffle = re_shuffle.querySelectorAll('.card');
 re_shuffle = shuffle(Array.from(re_shuffle));

 /*
 *   - loop through each card and create its HTML
 */
 for (card of re_shuffle) {
   deck.appendChild(card);
 }

 /*
 *   - add each card's HTML to the page
 */

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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 */
var openCardCount = 0;
var openCards = Array(2);
var classfirstOpen;
var classsecondOpen;
var elemfirstOpen;
var elemsecondOpen;
var array_1 = Array()

const pairs = 0;
var score = 0;
var moves = 0;


function checkCards(element) {
  // Return function if two cards are already open
  if (openCardCount == 2) {
    return;
  }

  // Increase the number of moves everytime a card is opened
  // Remove performance star at 32 and 48
  const moves_html = document.querySelector('.moves');
  moves += 1;
  moves_html.innerContent = moves.toString();
  if (moves == 32){
    document.querySelector('.fa-star').remove();
    console.log('moves is more than 3')
  };
  if (moves == 48){
    document.querySelector('.fa-star').remove();
  }

  if (openCardCount == 1) {
    openCardCount += 1;
    elemsecondOpen = element;
    elemsecondOpen.classList.toggle('match');
    classsecondOpen = elemsecondOpen.childNodes[1].classList[1];
    classfirstOpen = elemfirstOpen.childNodes[1].classList[1];
    if (classfirstOpen === classsecondOpen) {
      console.log("These are the same cards");
      openCardCount = 0;
      score += 1;
      return;
    };
    if (classfirstOpen != classsecondOpen) {
      console.log("These are not the same cards")
      setTimeout(function facedown() {
        elemfirstOpen.classList.toggle('match');
        elemsecondOpen.classList.toggle('match');
        openCardCount = 0;
      }, 2000);
      return;
    };

  }
  if (openCardCount == 0) {
    openCardCount += 1;
    element.classList.toggle('match');
    elemfirstOpen = element;
    return;
  }
};

function openCard(element) {
  element.addEventListener('click', (e) => {
    checkCards(element);
    startTimer();
  });
};

document.querySelectorAll('.card').forEach(card => {
  openCard(card);
});




/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
