/* Exercise 1: Wish list */
$(document).ready(function() {
	updateTotal();

	$(document).on('click', '#add-to-list', function() {
		var item = $('#item').val();
		$('#item').val("");
		$('#item').focus();
		addToList(item);
	});
	
	$(document).on('click', '.pending', function() {
		var pending = $(this);
		completeItem(pending);
	});
});

function updateTotal() {
	pending = $('.pending').length;
	completed = $('.success').length;
	if (pending > 0 || completed > 0) {
		$('.total').text("Pending: " + pending + " Completed: " + completed);
	}
}

function addToList(item) {
	var span = "<span class='label pending'>Pending</span>";
	$('ol#items').append('<li>' + item + span + '</li>');
	updateTotal();
}

function completeItem (item) {
	success = "<span class = 'label success'>Done!</span>";
	item.parent().append(success);
	item.parent().attr("class", "completed");
	item.remove();
	updateTotal();
}
