console.log("Kyle is my best friend who likes pushing me to be a better coder");

var numWordsUsedThisGame = 25;

//should scale based on game size??
var CardAssignments = function() {
  var firstPlayerRed = Math.floor(Math.random() * 2);

  this.red = { wordNum: firstPlayerRed ? 9 : 8, color: "red", assigned: 0 };
  this.blue = { wordNum: firstPlayerRed ? 8 : 9, color: "cyan", assigned: 0 };
  this.bystander = { wordNum: 7, color: "white", assigned: 0 };
  this.assassin = { wordNum: 1, color: "black", assigned: 0 };
};

$.getJSON( "../src/assets/word_lists/original.json", function(data) {

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

  var wordsInGame = findWordsUsedThisGame(data.words, numWordsUsedThisGame);

  var $wordGrid = $(".gameBoard .wordGrid");

  wordsInGame.forEach(function(word, index) {

    $('<li/>', {
      id: "codeWord_" + index,
      text: word
    }).appendTo($wordGrid);
  });

  $wordGrid.addClass('expand');
  assignColors(numWordsUsedThisGame);
});

function assignColors(gameSize) {
  var theseCards = new CardAssignments;
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


  //assign all the numbers to a color
  //add the class of each color to each number
}


//<table class="gameBoard">
//    <CAPTION>Code Words</CAPTION>
//
//<TR>
//<TD> Marcia </TD>
//<TD> Carol </TD>
//<TD> Greg </TD>
//<TD> Alice </TD>
//<TD> Peter </TD>
//</TR>
//
//<TR>
//<TD> Ice </TD>
//<TD> Alice </TD>
//<TD> Peter </TD>
//<TD> Alice </TD>
//<TD> Peter </TD>
//</TR>
//
//<TR>
//<TD> Buggaloo </TD>
//<TD> Mike </TD>
//<TD>Bobby </TD>
//<TD> Alice </TD>
//<TD> Peter </TD>
//</TR>
//
//<TR>
//<TD> Turpentine </TD>
//<TD> Mike </TD>
//<TD>Bobby </TD>
//<TD> Alice </TD>
//<TD> Shakespeare </TD>
//</TR>
//
//<TR>
//<TD> Assholes </TD>
//<TD> Mike </TD>
//<TD>Bobby </TD>
//<TD> Alice </TD>
//<TD> Peter </TD>
//</TR>
