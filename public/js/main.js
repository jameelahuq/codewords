console.log("Kyle is kinda ok but really he's kind of a butt");

//-----------Game Parameters ----------//
var NUM_WORDS_USED_THIS_GAME = 25;



//-----------Commonly Used Ponters------//
var $powerButton = $('#powerButton');
var $nameBar = $('.switchTurns');
var $wordGrid = $(".wordGrid");

//----------Start Game Function-----------//
$powerButton.on("mouseup", revealGameBoard);

function revealGameBoard() {
  $powerButton.addClass("hidden");
  $nameBar.removeClass("hidden");
  $wordGrid.removeClass("hidden");
  toggleFullScreen();
}



function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}



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
  var spyMasterOn = false;
  var toggleTurnTimer;

  $nameBar.on('mousedown touchstart', startModeChangeTimer);
  $nameBar.on('mouseup touchend', stopModeChangeTimer);



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

  $cards.on('mousedown touchstart', startCardSelectorTimer);
  $cards.on('mouseup touchend', stopCardSelectorTimer);


  function startCardSelectorTimer() {
    var $this = $(this);

    function flipCard() {
      if (!spyMasterOn) {
        $this.removeClass('cw facedown');
        $this.addClass('chosen');
        $this.off('mousedown touchstart', startCardSelectorTimer);
        $this.off('mouseup touchend', stopCardSelectorTimer);
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
