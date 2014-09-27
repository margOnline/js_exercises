$(document).ready(function() {
	$(document).on('click', '#add-to-favorite', function(){
		var color = $('#color').val();
		addBox(color);
	});

	$(document).on('keypress keyup keydown', '#color', function(){
		var color = $('input').val();
		setPreviewColor(color);
	});
});

function setPreviewColor(color){
	$('.preview').css('background-color', color);
	$('.color-code').text($('.preview').css('background-color'));
}

function addBox(color) {
	var fav = "<div class='item' style='background-color: " + color + ";'></div>";
	$('#colors').prepend(fav);
}