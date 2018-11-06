document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var site = "http://uksh.app-agentur.de/api";
	var deviceID = device.uuid;

	/* get paramedic id */
	$.get(site+'/get-paramedic-id/'+deviceID, function(res) {
		var pID = res;
		$.get(site+'/today-list/'+pID, function(resx) {
			var content = '';
			$.each(resx, function(i, val) {
				var created = val.created_at;
				var date = created.split(" ");
				var time = date[1].split(":");
				var act_time = time[0]+':'+time[1];
				var button = '<td></td>';
				if (i == 0) {
					button = '<td><button class="btn btn-danger" onclick="editPatient('+ val.patient_id +')">E</button></td>';
				}
				if (val.patient_age == 0) {
					age = '?';
				} else {
					age = val.patient_age;
				}

				/* check if edited */
				if (val.edited == '1') {
					edited = 'Ja';
				} else {
					edited = 'Nein';
				}
				//content += '<tr><td>'+ age  +'('+ val.patient_gender +')</td><td>'+ val.patient_gender +'</td><td>'+ date[1] +'</td><td>'+ val.hospital +'</td><td>'+ edited +'</td>'+ button +'</tr>';
				content += '<tr><td>'+ age  +' ('+ val.patient_gender +')</td><td>'+ act_time +'</td><td>'+ val.hospital +'</td><td>'+ edited +'</td>'+ button +'</tr>';
			});
			$('.pat-list').html(content);
		});
	});

	
}

/**/
	function editPatient(id) {
		localStorage.pid = id;
		redirect("slider_edit.html");
	}