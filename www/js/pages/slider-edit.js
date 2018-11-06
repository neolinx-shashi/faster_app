document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var site = "http://uksh.app-agentur.de/api";
	var deviceID = device.uuid;

	var pid = localStorage.pid;

	/* get detail */
	$.get(site+'/get-patient-detail/'+pid, function(res) {
		//console.log(res);
		/* detail */
		var patient_gender = res[0].patient_gender;
		var patient_age = res[0].patient_age;
		var hospital = res[0].hospital;
		var arrival_time = res[0].arrival_time;
		localStorage.pat_id = res[0].patient_id;

		/**/
		$('input.patient_gender[value="'+patient_gender+'"]').parent().addClass('active');
		if (patient_age == '0') {
			$('input.patient_age[value="Unbek"]').parent().addClass('active');
		} else {
			$('input.age_no').val(patient_age);
			$('input.age_no').parent().addClass('active');
		}
		$('#choose-office').val(hospital);
		$('input.time_to_hospital').val(arrival_time);

		/* symptom */
		var symptoms = res[0].symptom_detail;
		$.each(symptoms, function(i, val) {
			if (i == 'time_yes') {
				$('.time_yes').val(val);
			}
			/**/
			if (i == 'last_fine') {
				if (val == 'Unbekannt') {
					$('.last_fine_unknown').parent().addClass('active');
				} else {
					$('.last_fine').val(val);
					$('.last_fine').parent().parent().addClass('active');
				}
			}
			$('div.'+i).find('input[value="'+ val +'"]').parent().addClass('active');

			if (i == 'observed' && val == 'Ja') {
				$('.time-yes').show();
				$('.time-no').hide();

				//$('.time_yes').val(val);
			} else if ((i == 'observed' && val == 'Nein')) {
				$('.time-no').show();
				$('.time-yes').hide();
			}

			if (i == 'anticoag' && val == 'Ja') {
				$('.if-so').show();
			} else if (i == 'anticoag' && val != 'Ja') {
				$('.if-so').hide();
			}

			if (i == 'comments') {
				$('#comments').val(val);
			}
		});

		/* examination */
		var response;
		var question;
		$.each(res, function(i, val) {
			response = val.examination_response;
			question = val.examination_exam;

			$('div[title="'+ question +'"]').find('input[value="'+ response +'"]').parent().addClass('active');
		});
	});
	
	/* get total score */
	$.get(site+'/get-total-score/'+pid, function(res) {
		$('h3.score').text(res);
	});

	/* edit submit */
	$('#edit-submit').click(function() {
		var target_clinic = $('.target-clinic select').val();
		var time_to_hospital = $('.time_to_hospital').val();
		/*
		if (target_clinic == undefined) {
			navigator.notification.alert("Wähle eine Klinik aus", doNothing, "Botschaft");
			return false;
		}
		*/
		if (time_to_hospital == '') {
			navigator.notification.alert("Geben Sie die voraussichtliche Ankunftszeit ein", doNothing, "Botschaft");
			return false;
		}
		
		$('#submit').attr('disabled', 'disabled');
		var patient_gender = $('.gender label.active input').val();
		var patient_age = $('.age label.active input.patient_age').val();
		if (patient_age == 'known') {
			patient_age = $('.age_no').val();
		} else {
			patient_age = 0;
		} 

		var state = $('.pre-state label.active input').val();

		var observed = $('.observed label.active input').val();
		if (observed == 'Ja') {
			var time_yes = $('input[name=time_yes]').val();
			var last_fine = '-';
		} else {
			/*
			var last_fine = $('input[name=last_fine]').val();
			if (last_fine == '') {
				last_fine = $('.time-no label.active input').val();
			}
			*/
			/*
			var last_fine = $('.last_fine').val(); 
			if (last_fine == '') {
				last_fine = $('.last_fine_unknown').val();
			}
			*/
			var last_fine = $('.time-no label.active input').val();
			var time_yes = '-';
		}

		var anticoag = $('.anticoagulant label.active input').val();
		var anticoag_name = $('.if-so label.active input').val();
		if (anticoag_name == 'Andere') {
			anticoag_name = $('.anticoag_name_x').val();
		}

		var medication_detected = $('.medication-detected label.active input').val();
		var relative_no = $('.tel-no label.active input').val();
		var doctor_record = $('.doctor-record label.active input').val();

		var impact_trauma = $('.impact-trauma label.active input').val();
		var haemorrhage = $('.haemorrhage label.active input').val();
		var bleeding_disorder = $('.bleeding-disorder label.active input').val();
		var comments = $('#comments').val();

		var consciousness = $('.examination label.active input').val();
		var consciousness_score = $('.examination label.active input').attr('score');
		var orientation = $('.orientation label.active input').val();
		var orientation_score = $('.orientation label.active input').attr('score');
		var cooperation = $('.cooperation label.active input').val();
		var cooperation_score = $('.cooperation label.active input').attr('score');
		var eye_movement = $('.eye-movement label.active input').val();
		var eye_movement_score = $('.eye-movement label.active input').attr('score');
		var facial_expression = $('.facial-expression label.active input').val();
		var facial_expression_score = $('.facial-expression label.active input').attr('score');
		var armmotorik_rechts = $('.armmotorik .left label.active input').val();
		var armmotorik_rechts_score = $('.armmotorik .left label.active input').attr('score');
		var armmotorik_links = $('.armmotorik .right label.active input').val();
		var armmotorik_links_score = $('.armmotorik .right label.active input').attr('score');
		var motor_skill_rechts = $('.motor-skills .left label.active input').val();
		var motor_skill_rechts_score = $('.motor-skills .left label.active input').attr('score');
		var motor_skill_links = $('.motor-skills .right label.active input').val();
		var motor_skill_links_score = $('.motor-skills .right label.active input').attr('score');
		var language = $('.language label.active input').val();
		var language_score = $('.language label.active input').attr('score');
		var dysarthria = $('.dysarthria label.active input').val();
		var dysarthria_score = $('.dysarthria label.active input').attr('score');

		/* store */
		$.post(site+ '/edit-symptom', {deviceID: deviceID, patient_gender: patient_gender, patient_age: patient_age, state: state, observed: observed, time_yes: time_yes, last_fine: last_fine, anticoag: anticoag, anticoag_name: anticoag_name, medication_detected: medication_detected, relative_no: relative_no, doctor_record: doctor_record, impact_trauma: impact_trauma, haemorrhage: haemorrhage, bleeding_disorder: bleeding_disorder, target_clinic: target_clinic, consciousness: consciousness, consciousness_score: consciousness_score, orientation: orientation, orientation_score: orientation_score, cooperation: cooperation,  cooperation_score: cooperation_score, eye_movement: eye_movement, eye_movement_score: eye_movement_score, facial_expression: facial_expression, facial_expression_score: facial_expression_score, armmotorik_rechts: armmotorik_rechts, armmotorik_rechts_score: armmotorik_rechts_score, armmotorik_links: armmotorik_links, armmotorik_links_score:armmotorik_links_score, motor_skill_rechts: motor_skill_rechts, motor_skill_rechts_score: motor_skill_rechts_score, motor_skill_links: motor_skill_links, motor_skill_links_score: motor_skill_links_score, language: language, language_score: language_score, dysarthria: dysarthria, dysarthria_score: dysarthria_score, time_to_hospital: time_to_hospital, pat_id: localStorage.pat_id, pid: pid, comments: comments}, function(res) {

			console.log(res);
			redirect("last.html");
				
		});

		return false;
	});
}