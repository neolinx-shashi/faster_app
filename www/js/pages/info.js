document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	$('.go-back').click(function() {
		history.back();
	});
}