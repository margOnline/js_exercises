$(document).ready(function() {
	$(document).on('click', '#add-to-favorite', function(){
		var color = $('#color').val();
		favColorItems = $('#colors .item');
		if (favColorItems.length == 16 ) {
			$('#colors .item').last().remove();
		}
		addBox(color);
		$('#color').val("");
		$('#color').focus();
	});

	$(document).on('keypress keyup keydown', '#color', function(){
		var color = $('input').val();
		setPreviewColor(color);
	});

	$(document).on('mouseenter', '.item', function(){
		currentColor = $('.preview').css('background-color');
		setPreviewColor($(this).css('background-color'));
	}).on('mouseleave', '.item', function(){
		setPreviewColor(currentColor);
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
