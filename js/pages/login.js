document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var site = "http://uksh.app-agentur.de/api";
	//var site = "http://uksh.local/api";

	var deviceID = device.uuid;

	/* validate form */
	$('#login-form').submit(function() {
		var email = $('#email').val();
		var password = $('#password').val();

		if (email == '') {
			$('#email').siblings('.err').text('Please enter email.');
			return false;
		} else if (validateEmail(email) === false) {
			$('#email').siblings('.err').text('Please enter vallid email.');
			return false;
		} else {
			$('#email').siblings('.err').text('');
		}

		if (password == '') {
			$('#password').siblings('.err').text('Please enter password.');
			return false;
		} else {
			$('#password').siblings('.err').text('');
		}

		if (email != '' && validateEmail(email) === true && password != '') {
			/* check email and password */
			var url = site + '/check-login';
			$.post(url, {email: email, password: password, uuid: deviceID}, function(res) {
				if (res == '1') {
					writeCookie("user=" + email);
					redirect("start.html");
				} else {
					$('.main-err').html('Incorrect Username or Password.');
				}
			});
		}
	});
}


$(function() {
	
});

