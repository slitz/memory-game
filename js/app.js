/*
 * Create a list that holds all of your cards
 */
const deck = $( ".deck" );
const cards = $( ".card" );
const restartButton = $( ".restart" );
let openCardsList = [];

// Reset all card classes so the are hidden to start
resetCards();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 const shuffledCards = shuffle(cards);

 shuffledCards.each( function( index, element ) {
   deck.append(element);
 })


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
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
$(".card .fa").click(function() {
  displayCard($(this));
  addToOpenCardsListAndCheckForMatch($(this));
})

/**
* @description Changes the class of a card to display its icon
*/
function displayCard(element) {
  element.addClass("open show");
}

/**
* @description Adds the selected card to a list of open cards and, if another card already exists in the list,
* checks for a match
*/
function addToOpenCardsListAndCheckForMatch(element) {
  openCardsList.push(element);
  if(openCardsList.length === 2) {
    if(openCardsList[0].attr("class") === openCardsList[1].attr("class")) {
      lockCardsInOpenPosition();
    } else {
      hideCards();
    }
    removeCardsFromList();
  }
}

/**
* @description Resets the class on all cards so that they are hidden.
*/
function resetCards() {
  cards.children().removeClass("open show match").addClass("card");
}

/**
* @description Changes the class on matching cards so they remain visible
*/
function lockCardsInOpenPosition() {
  $.each(openCardsList, function() {
    $(this).addClass("match");
  })
}

/**
* @description Changes the class on non matching cards so they are hidden and
* removes cards from open cards list
*/
function hideCards() {
  $.each(openCardsList, function(index, element) {
    $(this).removeClass("open show", 1000);
  })
}

/**
* @description Empties the list of open cards
*/
function removeCardsFromList() {
  openCardsList.length = 0;
}

restartButton.click(function() {
  location.reload();
})
