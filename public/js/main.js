console.log("Kyle is kinda ok but really he's kind of a butt");

var NUM_WORDS_USED_THIS_GAME = 25;

//should scale based on game size??
var CardAssignments = function() {
  var firstPlayerRed = Math.floor(Math.random() * 2);

  this.red = { wordNum: firstPlayerRed ? 9 : 8, color: "red", assigned: 0 };
  this.blue = { wordNum: firstPlayerRed ? 8 : 9, color: "cyan", assigned: 0 };
  this.bystander = { wordNum: 7, color: "white", assigned: 0 };
  this.assassin = { wordNum: 1, color: "black", assigned: 0 };
};


$.getJSON("assets/word_lists/original.json", function(data) {

  function findWordsUsedThisGame(wordBank, gameSize) {
    var usedWordIndices = [];
    var wordList = [];

    //copy and pasting this loop for the color selector too
    while(usedWordIndices.length < gameSize){
      var randNum = Math.floor(Math.random()* wordBank.length);
      if(usedWordIndices.indexOf(randNum) === -1) {
        usedWordIndices.push(randNum);
        wordList.push(wordBank[randNum])
      }
    }
    return wordList;
  }

  var wordsInGame = findWordsUsedThisGame(data.words, NUM_WORDS_USED_THIS_GAME);

  var $wordGrid = $(".wordGrid");

  wordsInGame.forEach(function(word, index) {

    $('<li/>', {
      id: "codeWord_" + index,
      class: 'facedown cw',
      text: word
    }).appendTo($wordGrid);
  });

  $wordGrid.addClass('expand');
  assignColors(NUM_WORDS_USED_THIS_GAME);
});

function assignColors(gameSize) {
  var theseCards = new CardAssignments();
  console.log(theseCards);
  var assignmentDone = [];

  //shuffle all the numbers,
  while(assignmentDone.length < gameSize){
    var randNum = Math.floor(Math.random()* 25);
    if(assignmentDone.indexOf(randNum) === -1) {
      assignmentDone.push(randNum);
    }
  }

  //assign all the numbers to a color
  var randArrIndex = 0;
  for (var key in theseCards) {
    var cardType = theseCards[key];
    while (cardType.assigned < cardType.wordNum) {
      $("#codeWord_" + assignmentDone[randArrIndex]).addClass("cardType_" + key);
      randArrIndex ++;
      cardType.assigned ++;
    }
  }

  $('.switchTurns').on('click', greenOnOrOff);

  var $cards = $('.cw.facedown');

  $cards.on('mousedown', startCardSelectorTimer);

  //assign all the numbers to a color
  $cards.on('mouseup', stopCardSelectorTimer);

  //add the class of each color to each number
}

var turnOverTimer;

function startCardSelectorTimer() {
  console.log("mouse down");
  var $this = $(this);

  function flipCard() {
    console.log("flipCards");
    $this.removeClass('cw facedown');
    $this.addClass('chosen');
    $this.off('mousedown', startCardSelectorTimer);
    $this.off('mouseup', stopCardSelectorTimer);
    clearInterval(turnOverTimer);
  }


  turnOverTimer = setInterval(flipCard, 500);
  //call flipCard after 5 seconds

}


function stopCardSelectorTimer() {
  console.log("mouse up");
  clearInterval(turnOverTimer);
}


function greenOnOrOff () {
  $('.cw').toggleClass('facedown');
}



//function toggle(buttonObj) {
//
//  var button = document.getElementById(buttonObj);
//
//  el.style.display = (el.style.display != 'none' ? 'none' : '' );
//
//}
//
//"toggle", myScript);
