(function () {
  'use strict';

  /*
   * Create a list that holds all of your cards
   */

  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *  + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */

  /* Card values */
  var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
  var memory_values = [];
  var memory_tile_ids = [];
  var tiles_flipped = 0;
  Array.prototype.memory_tile_shuffle = function () { // jshint ignore:line
    var i = this.length, j, temp;
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this[j];
      this[j] = this[i];
      this[i] = temp;
    }
  };

  /*Timer, star and move code*/

  const ScorePanel = {
    move: 0,
    time: 0,
    star: 3,
    incrementTime: () => {
      ScorePanel.time += 1;
      ViewChanger.setTime(ScorePanel.time);
    },
    incrementMove: () => {
      ScorePanel.move += 1;
      ViewChanger.setMoves(ScorePanel.move);

      if (ScorePanel.move === 30) {
        ScorePanel.star = 2;
        ViewChanger.setStars(2);
      } else if (ScorePanel.move === 40) {
        ScorePanel.star = 1;
        ViewChanger.setStars(1);
      } else {
        // do nothing. stars don't change
      }
    },
    reset: () => {
      ScorePanel.move = 0;
      ScorePanel.star = 3;
      ScorePanel.time = 0;
      ViewChanger.setMoves(0);
      ViewChanger.setStars(3);
      ViewChanger.setTime(0);
    }
  }
  Object.seal(ScorePanel);
  setInterval(() => {
    ScorePanel.incrementTime();
  }, 1000);

/* Functions to updates the moves, stars and time*/
  let Timer;

  class ViewChanger {
    static setStars(numStars) {
      console.log(`class ViewChanger setStars(${numStars}) : changes number of stars in View`);
      const d = document.getElementsByClassName("stars")[0];
      const starHTML = '<li><i class="fa fa-star"></i></li>';
      d.innerHTML = starHTML.repeat(numStars);
    }

    static setMoves(numMoves) {
      console.log(`class ViewChanger setMoves(${numMoves}) : changes number of moves in View`);
      const d = document.getElementsByClassName("moves")[0];
      d.innerHTML = numMoves;
    }
    static setTime(seconds) {
      console.log(`class ViewChanger setTime(${seconds}) : changes timer in View`);
      const d = document.getElementsByClassName("timer")[0];
      d.innerHTML = seconds;
    }
  }

  function newBoard() {
    ScorePanel.reset();
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for (var i = 0; i < memory_array.length; i++) {
      output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
  }

  function flip2Back() {
    // Flip the 2 tiles back over
    var tile_1 = document.getElementById(memory_tile_ids[0]);
    var tile_2 = document.getElementById(memory_tile_ids[1]);
    tile_1.style.background = 'url("/assets/img.png") no-repeat';
    tile_1.innerHTML = '';
    tile_2.style.background = 'url("/assets/img.png") no-repeat';
    tile_2.innerHTML = '';
    // Clear both arrays
    memory_values = [];
    memory_tile_ids = [];
  }

  window.addEventListener('load', newBoard);
  /* function to flip cards */
  window.memoryFlipTile = function (tile, val) {
    if (tile.innerHTML === '' && memory_values.length < 2) {
      tile.style.background = '#FFF';
      tile.innerHTML = val;
      if (memory_values.length === 0) {
        memory_values.push(val);
        memory_tile_ids.push(tile.id);
      } else if (memory_values.length === 1) {
        ScorePanel.incrementMove();
        memory_values.push(val);
        memory_tile_ids.push(tile.id);
        if (memory_values[0] === memory_values[1]) {
          tiles_flipped += 2;
          // Clear both arrays
          memory_values = [];
          memory_tile_ids = [];
          // Check to see if the whole board is cleared
          if (tiles_flipped === memory_array.length) {


            // @description congratulations when all cards match, show modal and moves, time and rating
            function congratulations(){
                if (matchedCard.length == 16){
                    clearInterval(interval);
                    finalTime = timer.innerHTML;

                    // show congratulations modal
                    modal.classList.add("show");

                    // declare star rating variable
                    var starRating = document.querySelector("stars").innerHTML;

                    //showing move, rating, time on modal
                    document.getElementById("moves").innerHTML = moves;
                    document.getElementById("stars").innerHTML = starRating;
                    document.getElementById("timer").innerHTML = finalTime;

                    //closeicon on modal
                    closeModal();
                };
            }

            // @description close icon on modal
            function closeModal(){
                closeicon.addEventListener("click", function(e){
                    modal.classList.remove("show");
                    startGame();
                });
            }

            // @desciption for user to play Again
            function playAgain(){
                modal.classList.remove("show");
				startGame();
            }
          }
        } else {
          setTimeout(flip2Back, 700);
        }
      }
    }
  };
})();
