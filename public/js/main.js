console.log("Kyle is kinda ok but really he's kind of a butt");

var NUM_WORDS_USED_THIS_GAME = 25;

//should scale based on game size??
var CardAssignments = function() {
  var firstPlayerOne = Math.floor(Math.random() * 2);

  this.player_one = { wordNum: firstPlayerOne ? 9 : 8, color: "one", assigned: 0 };
  this.player_two = { wordNum: firstPlayerOne ? 8 : 9, color: "two", assigned: 0 };
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

  //+++++++++++MODE SELECTION+++++++++++++++
  var $nameBar = $('.switchTurns');
  var spyMasterOn = false;
  var toggleTurnTimer;

  $nameBar.on('mousedown', startModeChangeTimer);
  $nameBar.on('mouseup', stopModeChangeTimer);



  function startModeChangeTimer() {
    toggleTurnTimer = setInterval(greenOnOrOff, 400);
  }

  function stopModeChangeTimer() {
    clearInterval(toggleTurnTimer);
  }


  function greenOnOrOff () {
    $('.cw').toggleClass('facedown');
    spyMasterOn = !spyMasterOn;
    clearInterval(toggleTurnTimer);
  }



  //+++++++++++CARD SELECTION+++++++++++++++++//
  var $cards = $('.cw.facedown');
  var selectCardTimer;

  $cards.on('mousedown', startCardSelectorTimer);
  $cards.on('mouseup', stopCardSelectorTimer);


  function startCardSelectorTimer() {
    var $this = $(this);

    function flipCard() {
      if (!spyMasterOn) {
        $this.removeClass('cw facedown');
        $this.addClass('chosen');
        $this.off('mousedown', startCardSelectorTimer);
        $this.off('mouseup', stopCardSelectorTimer);
        clearInterval(selectCardTimer);
      }
    }

    selectCardTimer = setInterval(flipCard, 500);
  }


  function stopCardSelectorTimer() {
    clearInterval(selectCardTimer);
  }

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
