document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var site = "http://uksh.app-agentur.de/api";
	var deviceID = device.uuid;

	/* go to slider page */
	$('#start_but').click(function() {
		redirect("slider.html");
	});


	/* logout */
	$('.logout').click(function() {
		$.post(site + '/logout', {uuid: deviceID}, function(res) {
			if (res == '1') {
				redirect("index.html");
			}
		});
	});
}

