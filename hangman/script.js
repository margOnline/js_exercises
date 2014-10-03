function prepareGame(){
  $('.remaining-guesses').hide();
  $('.console').hide();
}

function startGame(){
  $('#new-game').hide();
  $('.remaining-guesses').show();
  $('.console').show();
  showLetterHolders();
}

function showLetterHolders(){
  $.ajax({
    type: 'POST',
    url:" http://hangman-api.herokuapp.com/hangman"
  }).done(function(data){
    console.log(data);
    $('.hangman-word').text(data.hangman);
    $('.token').text(data.token);
  });
}

function makeGuess(token,guess){
  $.ajax({
    type: 'PUT',
    dataType: 'json',
    data: { "token": token, "letter": guess },
    url: "http://hangman-api.herokuapp.com/hangman"
  }).done(function(data){
    console.log(data);
    processGuess(data, guess);
  });
}

function processGuess(data,guess){
  if (data.correct) {
    handleCorrectGuess(data, guess);
  } else {
    handleWrongGuess(data, guess);
  }
}

function handleCorrectGuess(data,guess){
  $('.token').text(data.token);
  $('.hangman-word').text(data.hangman);
  displayAllGuesses(guess, 'correct');
  updateRemainingGuesses();
}

function handleWrongGuess(data,guess){
  updateRemainingGuesses();
  displayAllGuesses(guess, 'wrong');
  guesses = $('.remaining').val() - 1;
    $('.remaining').val(guesses);
}

function displayAllGuesses(guess,cssClass){
  $('.attempts').append("<span class='" + cssClass +"''>" + guess + "</span>");
}

function updateRemainingGuesses() {
  guesses = $('.remaining').text();
  $('.remaining').text(guesses - 1);
}

$(document).ready(function(){
  prepareGame();

  $(document).on('click','#new-game', function(e){
    startGame();
  });

  $(document).on('click', '#guess', function(e){
    token = $('.token').text();
    guess = $('.letter').val();
    console.log(token);
    console.log(guess);
    makeGuess(token, guess);
  });
});
