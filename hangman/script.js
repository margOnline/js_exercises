function prepareGame(){
  $('.remaining-guesses').hide();
  $('.console').hide();
}

function startGame(){
  $('#new-game').hide();
  $('.remaining-guesses').show();
  $('.console').slideToggle(1000);
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

function getSolution(token){
  $.ajax({
    url: 'http://hangman-api.herokuapp.com/hangman',
    data: {'token': token }
  }).done(function(data){
    console.log(data);
    showSolution(data);
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
  if (data.hangman.indexOf('_') != -1) {
    $('.token').text(data.token);
    $('.hangman-word').text(data.hangman);
    displayGuess(guess, 'correct');
  } else {
    endGameSuccessfully(data);
  }
}

function handleWrongGuess(data,guess){
  displayGuess(guess, 'wrong');
  guesses = $('.wrong').length;
  updateRemaining(guesses);
  if (guesses == 7) {
    noMoreGuesses();
  } else {
    $('.remaining').val(guesses);
  }
}

function displayGuess(guess,cssClass){
  $('.attempts').append("<span class='" + cssClass +"''>" + guess + "</span>");
}

function updateRemaining(guesses) {
  $('.remaining').text(7 - guesses);
}

function noMoreGuesses(){
  $('.console').slideToggle(1000);
  token = $('.token').text();
  getSolution(token);
}

function showSolution(data){
  $('.hangman-word').text(data.solution);
  displayEndMessage('You have used all 7 guesses');
}

function endGameSuccessfully(data){
  $('.console').slideToggle(1000);
  $('.hangman-word').text(data.hangman);
  displayEndMessage("Congratulations! You've won!")
}

function displayEndMessage(text) {
  $('.remaining-guesses').text('');
  $('.remaining-guesses').text(text);
}

$(document).ready(function(){
  prepareGame();

  $(document).on('click','#new-game', function(e){
    startGame();
  });

  $(document).on('click', '#guess', function(e){
    token = $('.token').text();
    guess = $('.letter').val();
    $('.letter').focus();
    console.log(token);
    console.log(guess);
    makeGuess(token, guess);
    $('.letter').val('');
  });
});
