function retrieveGenres() {
	$.ajax({
		url: 'http://www.bbc.co.uk/tv/programmes/genres.json',
		dataType: 'json'
	}).done(function(data){
		console.log(data);
		$.each(data.categories, function(index, elem) {
			displayGenre(elem);
		});
	}).fail(function(){
		$('#genres').html('There are no genres');
	});
}

function displayGenre(genre) {
	listItem = "<li>" + genre.key + "</li>"
	$('#genres').append(listItem);
}

$(document).ready(function(){
	retrieveGenres();
});