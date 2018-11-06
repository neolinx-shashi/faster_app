$(document).ready(function(){

	$('.go-to-back').click(function(){
		var mySwiper = document.querySelector('.swiper-container').swiper

		// Now you can use all slider methods like
		mySwiper.slidePrev();
	});

    $("#ip-ios, #ip-ios2").AnyPicker(
                {
                    mode: "datetime",
                
					dateTimeFormat: "HH:mm",
					
					intervals:{
						h:1,
						m:5
					},

                    theme: "Default" // "Default", "iOS", "Android", "Windows"
                });
})
var swiper = new Swiper('.swiper-container',{
	//autoHeight: true,
	// allowSlideNext: false
});