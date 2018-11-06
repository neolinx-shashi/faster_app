document.addEventListener("deviceready", onDeviceReadys, false);

function onDeviceReadys() {
	var site = "http://uksh.app-agentur.de/api";
	//var site = "http://uksh.local/api";

	var deviceID = device.uuid;

	var pid = localStorage.pid;

	/* trigger slide */
	$('.swiper-slide .btn-group label').click(function() {
		if ($(this).parent().parent().parent().parent().hasClass('two-column')) {
			var side = $(this).parent().parent().attr('side');

			/* check selected radio option */
			$(this).parent().find('input').removeAttr('checked');
			$(this).children('input').attr('checked', 'checked');

			if (side == 'left') {
				if ($(this).parent().parent().parent().children('.right').children().children().hasClass('active')) {
					document.querySelector('.swiper-container').swiper.slideNext();
					$('html,body').scrollTop(0);
				}
			} else if (side == 'right') {
				if ($(this).parent().parent().parent().children('.left').children().children().hasClass('active')) {
					document.querySelector('.swiper-container').swiper.slideNext();
					$('html,body').scrollTop(0);
				}
			}
		} else {
			/* check selected radio option */
			$(this).parent().find('input').removeAttr('checked');
			$(this).children('input').attr('checked', 'checked');

			document.querySelector('.swiper-container').swiper.slideNext();
			$('html,body').scrollTop(0);
		}
	});
}