$(document).on('keypress keyup keydown', '#color', function(){
	var color = $('input').val();
	setPreviewColor(color);
});

function setPreviewColor(color){
	$('.preview').css('background-color', color);
	$('.color-code').text($('.preview').css('background-color'));
}