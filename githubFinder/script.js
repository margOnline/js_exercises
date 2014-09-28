function getGithubUser(username) {
	xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.github.com/users/" + username, false);
	xhr.send();
	return xhr;
}

function showGithubUser(user){
	text = user.name + " is Github user #" + user.id;
	imgSrc = "<img src='" + user.avatar_url + "' height=220 width=220>";
	link = "<a class='profile' href='" + user.html_url + "' >visit " + user.name + "</a>"
	$('#profile h2').html(text)
	$('.avatar').html(imgSrc);
	$('.information').html(link);
}

function showUserNotFound(username){
	text = "No such user " + username;
	$('#profile h2').html(text);
	$('.avatar').hide();
	$('.information').hide();
}

$(document).ready(function(){
	$(document).on('keypress', '#username', function(e){
		if (e.which == 13){
			username = $(this).val();
			$(this).val("");
			response = getGithubUser(username);

			if (response.status == 200) {
				showGithubUser(JSON.parse(response.responseText));
			}
			else {
				showUserNotFound(username);
			}
		}
	})
});