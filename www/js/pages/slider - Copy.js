document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var site = "http://uksh.app-agentur.de/api";
	//var site = "http://uksh.local/api";

	var deviceID = device.uuid;

	/* trigger slide */
	$('.swiper-wrapper #page').each(function(i, v) {
		if ($(this).hasClass('exam')) {

		} else {
			pageno = $(this).attr('page');
			var cnt = $('.'+ pageno + ' .btn-group').length;
			if (pageno == '2') {
				cnt -= 1;
			} else if (pageno == '3') {
				cnt += 1;
			}

			$('.'+ pageno +' .btn-group label').click(function() {
				/* check selected radio option */
				$(this).parent().find('input').removeAttr('checked');
				$(this).children('input').attr('checked', 'checked');
				$(this).siblings().removeClass('bling');
				$(this).addClass('bling');

				var active = $(this).parent().parent().parent().find('.bling').length;

				if (cnt == active) {
					document.querySelector('.swiper-container').swiper.slideNext();
					setTimeout(function() {$('html,body').scrollTop(0);}, 100);
					
				}
			});
		}
		
	});

	/* observed */
	$('.observed').click(function() {
		var ob = $('input[name=observed]:checked').val();
		if (ob == 'Ja') {
			$('.time-no').hide();
			$('.time-yes').show();
		} else {
			$('.time-yes').hide();
			$('.time-no').show();
		}
	});

	/* anticoagulant */
	$('.anticoagulant').click(function() {
		var coag = $('input[name=anticoag]:checked').val();
		if (coag == 'Ja') {
			$('.if-so').show();
		} else {
			$('.if-so').hide();
			document.querySelector('.swiper-container').swiper.slideNext();
			setTimeout(function() {$('html,body').scrollTop(0);}, 100);
		}
	});

	$('.if-so label').click(function() {
		var name = $('input[name=anticoag_name]:checked').val();
		if (name == 'Andere') {
			
			setTimeout(function() {
				$('.anticoag_name_x').show().focus();
				$('.btn-anticloag').show();
			},500);
		} else {
			document.querySelector('.swiper-container').swiper.slideNext();
			setTimeout(function() {$('html,body').scrollTop(0);}, 100);
		}
	});

	$('.btn-anticloag').click(function() {
		$('.anticoag_name_x').focusout();
		document.querySelector('.swiper-container').swiper.slideNext();
		setTimeout(function() {$('html,body').scrollTop(0);}, 100);
	});

	/* put phone number to call */
	$('.clinic').click(function() {
		var tele = $(this).children('.target_clinic').attr('tele');
		var num = 'tel:'+tele;
		$('.call-hospital').attr('href', num);
		localStorage.clinicNumber = tele;
	});

	/* examination */
	$('.swiper-slide .btn-group label').click(function() {
		if ($(this).hasClass('exam')) {
			if ($(this).parent().parent().parent().parent().hasClass('two-column')) {
				var side = $(this).parent().parent().attr('side');

				/* check selected radio option */
				$(this).parent().find('input').removeAttr('checked');
				$(this).children('input').attr('checked', 'checked');

				if (side == 'left') {
					if ($(this).parent().parent().parent().children('.right').children().children().hasClass('active')) {
						document.querySelector('.swiper-container').swiper.slideNext();
						setTimeout(function() {$('html,body').scrollTop(0);}, 100);
					}
				} else if (side == 'right') {
					if ($(this).parent().parent().parent().children('.left').children().children().hasClass('active')) {
						document.querySelector('.swiper-container').swiper.slideNext();
						setTimeout(function() {$('html,body').scrollTop(0);}, 100);
					}
				}
			} else {
				/* check selected radio option */
				$(this).parent().find('input').removeAttr('checked');
				$(this).children('input').attr('checked', 'checked');

				document.querySelector('.swiper-container').swiper.slideNext();
				setTimeout(function() {$('html,body').scrollTop(0);}, 100);
			}

			/* add score */
			var sc = $(this).find('input:checked').attr('score');
			var tot_sc = $('.count_score').val();
			var new_tot = parseInt(tot_sc) + parseInt(sc);
			$('.count_score').val(new_tot);
			$('.score').html(new_tot);
		}
	});

	/* submit form */
	$('#submit').click(function() {
		
		$('#submit').attr('disabled', 'disabled');
		var patient_gender = $('.gender label.active input').val();//$('input[name=gender]:checked').val();
		var patient_age = $('.age label.active input').val();//$('input[name=age]:checked').val();
		if (patient_age == 'known') {
			patient_age = $('.age_no').val();
		} else {
			patient_age = 0;
		}

		var state = $('input[name=state]:checked').val();

		var observed = $('input[name=observed]:checked').val();
		if (observed == 'Ja') {
			var time_yes = $('input[name=time_yes]').val();
			var last_fine = '';
			var time_no = '';
		} else {
			var last_fine = $('input[name=last_fine]').val();
			var time_no = $('input[name=time_no]:checked').val();
			var time_yes = '';
		}

		var anticoag = $('input[name=anticoag]:checked').val();
		var anticoag_name = $('input[name=anticoag_name]:checked').val();
		if (anticoag_name == 'Andere') {
			anticoag_name = $('.anticoag_name_x').val();
		}

		var medication_detected = $('input[name=medication_detected]:checked').val();
		var relative_no = $('input[name=relative_no]:checked').val();
		var doctor_record = $('input[name=doctor_record]:checked').val();

		var impact_trauma = $('input[name=impact_trauma]:checked').val();
		var haemorrhage = $('input[name=haemorrhage]:checked').val();
		var bleeding_disorder = $('input[name=bleeding_disorder]:checked').val();

		var target_clinic = $('.target-clinic label.active input').val();//$('input[name=target_clinic]:checked').val();
		var time_to_hospital = $('.time_to_hospital').val();

		/*
		var consciousness = $('input[name=consciousness]:checked').val();
		var consciousness_score = $('input[name=consciousness]:checked').attr('score');
		var orientation = $('input[name=orientation]:checked').val();
		var orientation_score = $('input[name=orientation]:checked').attr('score');
		var cooperation = $('input[name=cooperation]:checked').val();
		var cooperation_score = $('input[name=cooperation]:checked').attr('score');
		var eye_movement = $('input[name=eye_movement]:checked').val();
		var eye_movement_score = $('input[name=eye_movement]:checked').attr('score');
		var facial_expression = $('input[name=facial_expression]:checked').val();
		var facial_expression_score = $('input[name=facial_expression]:checked').attr('score');
		var armmotorik_rechts = $('input[name=armmotorik_rechts]:checked').val();
		var armmotorik_rechts_score = $('input[name=armmotorik_rechts]:checked').attr('score');
		var armmotorik_links = $('input[name=armmotorik_links]:checked').val();
		var armmotorik_links_score = $('input[name=armmotorik_links]:checked').attr('score');
		var motor_skill_rechts = $('input[name=motor_skill_rechts]:checked').val();
		var motor_skill_rechts_score = $('input[name=motor_skill_rechts]:checked').attr('score');
		var motor_skill_links = $('input[name=motor_skill_links]:checked').val(); 
		var motor_skill_links_score = $('input[name=motor_skill_links]:checked').attr('score');
		var language = $('input[name=language]:checked').val();
		var language_score = $('input[name=language]:checked').attr('score');
		var dysarthria = $('input[name=dysarthria]:checked').val();
		var dysarthria_score = $('input[name=dysarthria]:checked').attr('score');
		*/
		
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

//console.log(consciousness + ' - '+orientation + ' - '+cooperation + ' - '+eye_movement + ' - '+facial_expression + ' - '+armmotorik_rechts + ' - '+armmotorik_links + ' - '+motor_skill_rechts + ' - '+motor_skill_links + ' - '+language + ' - '+dysarthria);

//console.log(consciousness_score + ' - '+orientation_score + ' - '+cooperation_score + ' - '+eye_movement_score + ' - '+facial_expression_score + ' - '+armmotorik_rechts_score + ' - '+armmotorik_links_score + ' - '+motor_skill_rechts_score + ' - '+motor_skill_links_score + ' - '+language_score + ' - '+dysarthria_score);


		/* store */
		
		$.post(site+ '/store-symptom', {deviceID: deviceID, patient_gender: patient_gender, patient_age: patient_age, state: state, observed: observed, time_yes: time_yes, last_fine: last_fine, time_no: time_no, anticoag: anticoag, anticoag_name: anticoag_name, medication_detected: medication_detected, relative_no: relative_no, doctor_record: doctor_record, impact_trauma: impact_trauma, haemorrhage: haemorrhage, bleeding_disorder: bleeding_disorder, target_clinic: target_clinic, consciousness: consciousness, consciousness_score: consciousness_score, orientation: orientation, orientation_score: orientation_score, cooperation: cooperation,  cooperation_score: cooperation_score, eye_movement: eye_movement, eye_movement_score: eye_movement_score, facial_expression: facial_expression, facial_expression_score: facial_expression_score, armmotorik_rechts: armmotorik_rechts, armmotorik_rechts_score: armmotorik_rechts_score, armmotorik_links: armmotorik_links, armmotorik_links_score:armmotorik_links_score, motor_skill_rechts: motor_skill_rechts, motor_skill_rechts_score: motor_skill_rechts_score, motor_skill_links: motor_skill_links, motor_skill_links_score: motor_skill_links_score, language: language, language_score: language_score, dysarthria: dysarthria, dysarthria_score: dysarthria_score, time_to_hospital: time_to_hospital}, function(res) {

				console.log(res);
				redirect("last.html");
				
		});

		return false;
	});
}


