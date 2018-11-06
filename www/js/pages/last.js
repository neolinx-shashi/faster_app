document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var site = "http://uksh.app-agentur.de/api";
	var deviceID = device.uuid;
	
	$('#last').click(function() {
		redirect("start.html");
	});

	/* hospital number */
	/*
	var number = localStorage.clinicNumber;
	var num = 'tel:'+number;
	$('.call-hospital').attr('href', num);
	*/

	/* hospital */
	var hid = localStorage.hospital;
	$.get(site + '/hospital-number/' + hid, function(res) {
		var tele = '';
		var content = '<option value="0">Anruf</option>';
		$.each(res, function(i, val) {
			content += '<option value="'+ val.number +'">'+ val.department +'</option>';
		});
		$('#choose-num').html(content);
	});
	
	/* make call */
	$('#choose-num').change(function() {
		$('.call-hospital').attr('href', 'tel:' + $(this).val()).trigger('click');
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