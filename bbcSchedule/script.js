function retrieveGenres() {
	$.ajax({
		url: 'http://www.bbc.co.uk/tv/programmes/genres.json',
		dataType: 'json'
	}).done(function(data){
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

function displayEpisode(item){
	item_html = "<li>";
	item_html += "<h2>" + item.programme.display_titles.title + "</h2>";
	item_html += "<p>" + item.programme.short_synopsis + "</p>";
	if (item.programme.image){
		src = "http://ichef.bbci.co.uk/images/ic/272x153/" + item.programme.image.pid + ".jpg";
		item_html += "<img src='" + src + "' />";
	} else {
		item_html += "<img src='http://placehold.it/272x153' />";
	}
	item_html += "<p>" + format_date(item.start, item.end) + "</p>";
	item_html += "<p>Duration: " + item.duration / 60 + " minutes</p>";
	item_html += "<p class='service'>" + item.service.title + "</p>"

	if (item.programme.position) {
		item_html += "<p><a class='view_more' id=" + item.programme.programme.pid + " href = '#'>View all upcoming " + item.programme.display_titles.title + "</a></p>";
	}

	item_html += "</li>";
	$('#programmes').append(item_html);
}

function getTomorrowsSchedule(genre) {
	show_spinner_gif();
	bbc_url = "http://www.bbc.co.uk/tv/programmes/genres/"+genre+"/schedules/tomorrow.json";
	$.ajax({
		url: bbc_url,
		dataType: 'json'
	}).done(function(data){
		$('.spinner').remove();
		$.each(data.broadcasts, function(index, elem) {
			displayEpisode(elem);
		});
	}).fail(function(){
		$('#genres').html('There are no programmes');
	});
}

function retrieveEpisodes(pid){
	show_spinner_gif();
	bbc_url = "http://www.bbc.co.uk/programmes/" + pid + "/episodes/upcoming.json";
	$.ajax({
		url: bbc_url,
		dataType: 'json'
	}).done(function(data){
		$('.spinner').remove();
		$.each(data.broadcasts, function(index, elem) {
			displayEpisode(elem);
		});
	}).fail(function(){
		$('#programmes').html('There are no upcoming episodes');
	});
}

function format_date(start, end) {
	start_date = new Date(start);
	end_date = new Date(end);
	day = start_date.getDay();
	month = start_date.getMonth() + 1;
	year = start_date.getFullYear();
	start_hour = start_date.getHours();
	start_min = start_date.getMinutes();
	end_hour = end_date.getHours();
	end_min = end_date.getMinutes();
	date = day + "/" + month + "/" + year + " ";
	start_time = ("0" + start_hour).slice(-2) + ":" + ("0" + start_min).slice(-2);
	end_time = ("0" + end_hour).slice(-2) + ":" + ("0" + end_min).slice(-2);
	return  date + start_time + " - " + end_time;
}

function show_spinner_gif(){
	$('#programmes').empty();
	$('#programmes').append("<div class='spinner'><img src='spinner.gif' /></div>");
}

$(document).ready(function(){

	$(document).on('click','#genres li', function(e){
		genre = $(this).text();
		$('#genres li').removeClass('active');
		$(this).addClass('active');
		getTomorrowsSchedule(genre);
	});

	$(document).on('click', '#programmes li a', function(e) {
		pid = $(this).attr('id');
		retrieveEpisodes(pid);
	});

	retrieveGenres();
});
