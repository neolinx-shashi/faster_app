document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var site = "http://uksh.app-agentur.de/api";
	//var site = "http://uksh.local/api";

	var deviceID = device.uuid;

	/* update hospital list */
	$.get(site + '/hospital-list', function(res) {
		var content = '';
		$.each(res, function(i, val) {
			content += '<option value="'+ val.hospital_name +'" id="'+ val.hospital_id +'">'+ val.hospital_name +'</option>'
		});
		$('#choose-office').html(content);

		/* get numbers */
		var id = $('.target-clinic select option:selected').attr('id');
		getPhoneNumbers(id);
	});

	/**/
	$('#choose-office').change(function() {
		var id = $('.target-clinic select option:selected').attr('id');
		getPhoneNumbers(id);
	});

	/* get phone numbers */
	function getPhoneNumbers(id) {
		$.get(site + '/hospital-number/' + id, function(res) {
			var tele = '';
			var content = '<option value="0">Anruf</option>';
			$.each(res, function(i, val) {
				content += '<option value="'+ val.number +'">'+ val.department +'</option>';
			});
			$('#choose-num').html(content);
			localStorage.hospital = id;
		});
	}

	/* make call */
	$('#choose-num').change(function() {
		$('.call-hospital').attr('href', 'tel:' + $(this).val()).trigger('click');
	});

	/* trigger slide */
	$('.swiper-wrapper #page').each(function(i, v) {
		if ($(this).hasClass('exam')) {

		} else {
			pageno = $(this).attr('page');
			var cnt = $('.'+ pageno + ' .btn-group').length;
			if (pageno == '2') {
				//cnt -= 1;
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
		//Keyboard.hide();
		document.querySelector('.swiper-container').swiper.slideNext();
		setTimeout(function() {$('html,body').scrollTop(0);}, 100);
	});

	$('.symptom-unknown, .btn-next').click(function() {
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
				//$(this).parent().find('input').removeAttr('checked');
				//$(this).children('input').attr('checked', 'checked'); 

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
				//$(this).parent().find('input').removeAttr('checked');
				//$(this).children('input').attr('checked', 'checked');

				document.querySelector('.swiper-container').swiper.slideNext();
				setTimeout(function() {$('html,body').scrollTop(0);}, 100);
			}

			/* add score */
			/*
			var sc = $(this).find('input').attr('score');
			var tot_sc = $('.count_score').val();
			var new_tot = parseInt(tot_sc) + parseInt(sc);
			$('.count_score').val(new_tot);
			$('.score').html(new_tot);
			*/
			setTimeout(function() {getTotalScore();}, 100);
		}
	});
	
	/* score */
	function getTotalScore() {
		var score = parseInt(0);
		$('.swiper-slide.exam label').each(function() {
			if ($(this).hasClass('active')) {
				var sym_score = $(this).find('input').attr('score');
				score += parseInt(sym_score);
			}
		});
		$('.count_score').val(score);
		$('.score').html(score);
	}
	
	function doNothing() {}

	/* submit form */
	$('#submit').click(function() {
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
		var patient_age = $('.age label.active input').val();
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
			var last_fine = $('input[name=last_fine]').val();
			if (last_fine == '') {
				last_fine = $('.time-no label.active input').val();
			}
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
		$.post(site+ '/store-symptom', {deviceID: deviceID, patient_gender: patient_gender, patient_age: patient_age, state: state, observed: observed, time_yes: time_yes, last_fine: last_fine, anticoag: anticoag, anticoag_name: anticoag_name, medication_detected: medication_detected, relative_no: relative_no, doctor_record: doctor_record, impact_trauma: impact_trauma, haemorrhage: haemorrhage, bleeding_disorder: bleeding_disorder, target_clinic: target_clinic, consciousness: consciousness, consciousness_score: consciousness_score, orientation: orientation, orientation_score: orientation_score, cooperation: cooperation,  cooperation_score: cooperation_score, eye_movement: eye_movement, eye_movement_score: eye_movement_score, facial_expression: facial_expression, facial_expression_score: facial_expression_score, armmotorik_rechts: armmotorik_rechts, armmotorik_rechts_score: armmotorik_rechts_score, armmotorik_links: armmotorik_links, armmotorik_links_score:armmotorik_links_score, motor_skill_rechts: motor_skill_rechts, motor_skill_rechts_score: motor_skill_rechts_score, motor_skill_links: motor_skill_links, motor_skill_links_score: motor_skill_links_score, language: language, language_score: language_score, dysarthria: dysarthria, dysarthria_score: dysarthria_score, time_to_hospital: time_to_hospital}, function(res) {

			console.log(res);
			redirect("last.html");
				
		});

		return false;
	});



    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        document.addEventListener("backbutton", function (e) {
            //check if the current page is not an about page
            if($.mobile.activePage.attr('id')!=="slider")
            {
                //In all other pages except 'about',the normal back button behaviour is exhibited
                window.history.back();
            }
        }, false );}

}


