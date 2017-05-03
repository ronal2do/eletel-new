(function($){
	"use strict";
    $(document).ready(function(){

        var cmscarousel = {
            "cms-carousel":{"margin":"22","loop":"true","mouseDrag":"true","nav":"false","dots":"true","autoplay":"false","autoplayTimeout":5000,"smartSpeed":1000,"autoplayHoverPause":"true","navText":["<i class=\"fa fa-arrow-left\"><\/i>","<i class=\"fa fa-arrow-right\"><\/i>"],"dotscontainer":"cms-carousel .cms-dots","responsive":{"0":{"items":1},"768":{"items":2},"992":{"items":3},"1200":{"items":3}}},
            "cms-carousel-2":{"margin":10,"loop":"true","mouseDrag":"true","nav":"false","dots":"false","autoplay":"false","autoplayTimeout":5000,"smartSpeed":1000,"autoplayHoverPause":"true","navText":["<i class=\"fa fa-arrow-left\"><\/i>","<i class=\"fa fa-arrow-right\"><\/i>"],"dotscontainer":"cms-carousel-2 .cms-dots","responsive":{"0":{"items":1},"768":{"items":3},"992":{"items":4},"1200":{"items":6}}}
        };
         

    	$(".cms-carousel").each(function(){
    		var $this = $(this),slide_id = $this.attr('id'),slider_settings = cmscarousel[slide_id];
            if($this.attr('data-slidersettings')){
                slider_settings = jQuery.parseJSON($this.attr('data-slidersettings'));
            }
            else{
                slider_settings.margin = parseInt(slider_settings.margin);
                slider_settings.loop = (slider_settings.loop==="true");
                slider_settings.mouseDrag = (slider_settings.mouseDrag==="true");
                slider_settings.nav = (slider_settings.nav==="true");
                slider_settings.dots = (slider_settings.dots==="true");
                slider_settings.autoplay = (slider_settings.autoplay==="true");
                slider_settings.autoplayTimeout =  parseInt(slider_settings.autoplayTimeout);
                slider_settings.autoplayHoverPause = (slider_settings.autoplayHoverPause==="true");
                slider_settings.smartSpeed = parseInt(slider_settings.smartSpeed);
                slider_settings.dotData = ($(this).data('dotData') === "true");
                if($('.cms-dot-container').length){
                    slider_settings.dotsContainer = '.cms-dots';
                    slider_settings.dotsEach = true;
                }
            }
    		$this.owlCarousel(slider_settings);
    	});
    });
})(jQuery)