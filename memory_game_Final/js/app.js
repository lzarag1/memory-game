/*
 * Initialize web-page
 */
const winner_message = document.querySelector('.winner-message');
winner_message.style.display = 'none';


/*
 * Initialize Variables
 *
 */
var equality = false;
var openCardCount = 0;
var openCards = Array();
var classfirst;
var classsecond;
var elemfirst;
var elemsecond;

const pairs = 0;
var score = 0;
var moves = 0;


/*
 * Create a stopwatch object to count time
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
 * Restart the game if the user wishes to do so
 */
 const Restart = document.querySelectorAll('.fa-repeat')[0].onclick = (e) => {
     e.view.location.reload();
 }



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

document.querySelectorAll('.card').forEach(card => {
  cardClicked(card);
});

function cardClicked(element) {
  element.addEventListener('click', (e) => {
    // If starting the game, start timer
    if (!watch.isOn) {
      watch.start();
    }

    // Open the card; if possible
    openCard(element);

    // If second card, test for equality
    if (openCardCount == 2) {
      equality = checkCards(openCards);

      if (equality == false) {
        // If cards are not equal, set an offset time of 2 seconds
        setTimeout(function facedown() {
          openCards[0].classList.toggle('match');
          openCards[1].classList.toggle('match');
          openCards = Array()
          openCardCount = 0;
        }, 2000);

        return;
      }

      // If cards are equal, increase the score and animate.
      openCards[0].classList.toggle('animation');
      openCards[1].classList.toggle('animation');
      // Delay Function
      setTimeout(function facedown() {
        openCards[0].classList.toggle('animation');
        openCards[1].classList.toggle('animation');
        openCards = Array()
        openCardCount = 0;
        score += 1;
        // Lastly, test if the user has won the game!!
        test_win(score, moves);
      }, 2000);
    }

  });
};

function openCard(element) {
  if (openCardCount < 2) {

      // Store Card Information
      openCardCount += 1;
      element.classList.toggle('match');
      openCards.push(element);

      // Score player
      moves += 1;
      inc_moves(moves);
      stars(moves);
  }
}

function stars(int){
  const moves_html = document.querySelector('.moves');
  if (moves == 32){
    moves_html.innerContent = moves.toString();
    document.querySelector('.fa-star').remove();
    moves_html.innerContent = moves.toString();
  };
  if (moves == 48){
    document.querySelector('.fa-star').remove();
  }
}

function inc_moves(moves) {
  const moves_html = document.querySelector('.moves');
  moves_html.innerHTML = moves.toString();
}


// Compare Cards
function checkCards(array) {

  // Store card information and test for equality
  elemfirst = array[0];
  elemsecond = array[1];
  classfirst = elemfirst.childNodes[1].classList[1];
  classsecond = elemsecond.childNodes[1].classList[1];
  if (classfirst == classsecond) {

    return true;
  }

  return false;
};

// This functions takes the score as an input and displays a congratulations message
//  if the user wins.
function test_win(score, moves) {
  if (score == 2) {
    watch.stop();
    const timer = document.getElementById('timer').innerHTML;
    console.log(timer);
    const time_to_win = document.getElementById('time_to_win');
    time_to_win.innerHTML = timer;
    winner_message.style.display = 'flex';
    const temp = document.querySelectorAll('.moves')[1];
    temp.innerHTML = moves;

  }
  return;
}

/*
 * End of game Logic
 */
const replay = document.querySelectorAll('.fa-repeat')[1].onclick = (e) => {
    e.view.location.reload();
}





/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
