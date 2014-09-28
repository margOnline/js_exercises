$(document).ready(function() {	
	var colors =['#d2691e','#fff8dc','#7fff00','#5f9ea0', '#e3e3e3','#deb887','#d26915','#d4d4d4','#ff7f50','#6495ed'];
	var position = Math.floor(Math.random() * colors.length);
	setPreviewColor(colors[position]);
	$.each(colors, function(index,elem){
		addBox(elem);
	});

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

function initializePreview(){
	
}
