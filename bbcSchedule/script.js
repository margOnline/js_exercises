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
	listItem = "<li class='js-genre'>" + genre.key + "</li>"
	$('#genres').append(listItem);
}

function getTomorrowsSchedule(genre) {
	$.ajax({
		url: "http://www.bbc.co.uk/tv/programmes/genres/"+genre+"/schedules/tomorrow.json",
		dataType: 'json',
		beforeSend: function(){
			$('#programmes').empty();
			$('#programmes').append("<div class='spinner'><img src='spinner.gif' /></div>");
		}
	}).done(function(data){
		$('.spinner').remove();
		console.log(data);
		$.each(data.broadcasts, function(index, elem) {
			displayProgramme(elem);
		});
	}).fail(function(){
		$('#genres').html('There are no programmes');
	});
}

function displayProgramme(item){
	item_html = "<li>";
	item_html += "<h2>" + item.programme.display_titles.title + "</h2>";
	item_html += "<p>" + item.programme.short_synopsis + "</p>"; 
	if (item.programme.image){
		src = "http://ichef.bbci.co.uk/images/ic/272x153/" + item.programme.image.pid + ".jpg";
		item_html += "<img src='" + src + "' />";
	} else {
		item_html += "<img src='http://placehold.it/272x153' />";
	}
	item_html += "<p>Start: " + item.start + " - " + item.end + "</p>";
	item_html += "<p>Duration: " + item.duration / 60 + " minutes</p>";
	item_html += "<p class='service'>" + item.service.title + "</p>"
	item_html += "</li>";
	$('#programmes').append(item_html);
}

$(document).ready(function(){
	
	$(document).on('click','#genres li', function(e){
		genre = $(this).text();
		getTomorrowsSchedule(genre);
	});

	retrieveGenres();
});