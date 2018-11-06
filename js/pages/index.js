document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var site = "http://uksh.app-agentur.de/api";
	//var site = "http://uksh.local/api";

	var deviceID = device.uuid;

	
	$.post(site + '/check-status', {uuid: deviceID}, function(res) {
		if (res == '1') {
			redirect("start.html");
		} else {
			redirect("login.html");
		}
	});

}