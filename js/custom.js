$(document).ready(function(){
    /*
    var d = new Date();
    $('.timepicker').timepicker({
        timeFormat: 'H:mm',
        interval: 5,
        minTime: '0',
        maxTime: '23:55p',
        defaultTime: d.getHours(),
        startTime: d.getHours()+':'+d.getMinutes(),
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
*/
	$('.go-to-back').click(function(){
		var mySwiper = document.querySelector('.swiper-container').swiper

		// Now you can use all slider methods like
		mySwiper.slidePrev();
	})
})
var swiper = new Swiper('.swiper-container',{
	//autoHeight: true,
	// allowSlideNext: false
});