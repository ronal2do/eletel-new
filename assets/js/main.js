jQuery(document).ready(function($) {
	"use strict";
	
	/* window */
	var window_width, window_height, scroll_top;
	
	/* admin bar */
	var adminbar = $('#wpadminbar');
	var adminbar_height = 0;
	
	/* header menu */
	var header = $('#cshero-header');
	var header_top = 0;
	
	/* scroll status */
	var scroll_status = '';
	
	/**
	 * window load event.
	 * 
	 * Bind an event handler to the "load" JavaScript event.
	 * @author Fox
	 */
	$(window).on('load', function() {
		
		/** current scroll */
		scroll_top = $(window).scrollTop();
		
		/** current window width */
		window_width = $(window).width();
		
		/** current window height */
		window_height = $(window).height();
		
		/* get admin bar height */
		adminbar_height = adminbar.length > 0 ? adminbar.outerHeight(true) : 0 ;
		
		/* get top header menu */
		header_top = header.length > 0 ? header.offset().top - adminbar_height : 0 ;
		
		/* check sticky menu. */
		if(CMSOptions.menu_sticky == '1'){
			cms_stiky_menu(scroll_top);
		}
		
		/* check video size */
		cms_auto_video_width();

		/* check mobile menu */
		cms_mobile_menu();

		/* page loading */
		cms_page_loading();

		/* Encroll */
		cms_enscroll();

		/* CMS Add Class */
		cms_add_class();

		cms_scroll_to_content();

		demos();

		cms_section_offset();
		
		/* check back to top */
		if(CMSOptions.back_to_top == '1'){
			/* add html. */
			$('body').append('<div id="back_to_top" class="back_to_top"><span class="go_up"></span></div><!-- #back-to-top -->');
			cms_back_to_top();
		}
		$(".cms-carousel-attorney-layout1").css('opacity','1');
		$(".view-demos").css('opacity','1');
		$(".vc_row-o-full-height").addClass('row-show').css('opacity','1');
	});
	
	/**
	 * reload event.
	 * 
	 * Bind an event handler to the "navigate".
	 */
	window.onbeforeunload = function(){ cms_page_loading(1); }

	/**
	 * resize event.
	 * 
	 * Bind an event handler to the "resize" JavaScript event, or trigger that event on an element.
	 * @author Fox
	 */
	$(window).on('resize', function(event, ui) {
		/** current window width */
		window_width = $(event.target).width();
		
		/** current window height */
		window_height = $(window).height();
		
		/** current scroll */
		scroll_top = $(window).scrollTop();
		
		/* check sticky menu. */
		if(CMSOptions.menu_sticky == '1'){
			cms_stiky_menu(scroll_top);
		}
		
		/* check mobile menu */
		cms_mobile_menu();

		/* check video size */
		cms_auto_video_width();

		/* Encroll */
		cms_enscroll();

		demos();

		cms_section_offset();
	});
	
	/**
	 * scroll event.
	 * 
	 * Bind an event handler to the "scroll" JavaScript event, or trigger that event on an element.
	 * @author Fox
	 */
	var lastScrollTop = 0;
	
	$(window).on('scroll', function() {
		/** current scroll */
		scroll_top = $(window).scrollTop();
		/** check scroll up or down. */
		if(scroll_top < lastScrollTop) {
			/* scroll up. */
			scroll_status = 'up';
		} else {
			/* scroll down. */
			scroll_status = 'down';
		}
		
		lastScrollTop = scroll_top;
		
		/* check sticky menu. */
		if(CMSOptions.menu_sticky == '1'){
			cms_stiky_menu();
		}
		
		/* check back to top */
		cms_back_to_top();
	});

	/**
	 * Stiky menu
	 * 
	 * Show or hide sticky menu.
	 * @author Fox
	 * @since 1.0.0
	 */
	function cms_stiky_menu() {
		if (header_top < scroll_top && window_width > 992) {
			switch (true) {
				case (window_width > 0):
					header.addClass('header-fixed');
					break;
			}
		} else {
			header.removeClass('header-fixed');
		}
	}
	
	/**
	 * Mobile menu
	 * 
	 * Show or hide mobile menu.
	 * @author Fox
	 * @since 1.0.0
	 */
	
	$('body').on('click', '#cshero-menu-mobile .cms-icon-menu', function(){
		var navigation = $(this).parents().find('#cshero-header-navigation');
		if(!navigation.hasClass('collapse')){
			navigation.addClass('collapse');
		} else {
			navigation.removeClass('collapse');
		}
	});
	/**
	 * Page Loading.
	 */
	function cms_page_loading($load) {
		switch ($load) {
		case 1:
			$('#cms-loadding').css('display','block')
			break;
		default:
			$('#cms-loadding').css('display','none')
			break;
		}
	}
	/* check mobile screen. */
	function cms_mobile_menu() {
		var menu = $('#cshero-header-navigation');
		
		/* active mobile menu. */
		switch (true) {
		case (window_width <= 992 && window_width >= 768):
			menu.removeClass('phones-nav').addClass('tablets-nav');
			/* */
			cms_mobile_menu_group(menu);
			break;
		case (window_width <= 768):
			menu.removeClass('tablets-nav').addClass('phones-nav');
			break;
		default:
			menu.removeClass('mobile-nav tablets-nav');
			menu.find('li').removeClass('mobile-group');
			break;
		}	
	}
	function demos() {
		var demo_content_h = $('.view-demos-content').height();
		$('.view-demos').css('margin-bottom',-demo_content_h+'px');
		$('.view-demos .open').on('click', function() {
	    	$('.view-demos').toggleClass('opened');
	    })
	}
	/**
	 * One page
	 * 
	 * @author Fox
	 */
	if(CMSOptions.one_page == true){
		
		var one_page_options = {'filter' : '.onepage'};
		
		if(CMSOptions.one_page_speed != undefined) one_page_options.speed = parseInt(CMSOptions.one_page_speed);
		if(CMSOptions.one_page_easing != undefined) one_page_options.easing =  CMSOptions.one_page_easing;
		$('#site-navigation').singlePageNav(one_page_options);
	}
	
	/* Group Sub Menu */
	function cms_mobile_menu_group(nav) {
		nav.each(function(){
			$(this).find('li').each(function(){
				if($(this).find('ul:first').length > 0){
					$(this).addClass('mobile-group');
				}
			});
		});
	}

	 /* CMS Gallery Popup */
    $('.cms-gallery-item').magnificPopup({
	  delegate: 'a.p-view', // child items selector, by clicking on it popup will open
	  type: 'image',
	  gallery: {
	     enabled: true
	  },
	  mainClass: 'mfp-fade'
	});

	/* Scroll To Content */
	function cms_scroll_to_content() { 
		$('.scroll-to-content').on('click', function(e) {
			var id_scroll = $(this).attr('href');
			var sticky_height = $('.header-fixed').height();
			e.preventDefault();
			$("html, body").animate({ scrollTop: $(id_scroll).offset().top - 55 }, 800);
		});
	}

    /* CMS Image Popup */
    $('.cms-image-zoom').magnificPopup({
	  delegate: 'a.p-view', // child items selector, by clicking on it popup will open
	  type: 'image',
	  mainClass: 'mfp-fade',
	  // other options
	});

    /* CMS Modal Popup */
	$('.popup-modal').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

	/**
	 * Parallax.
	 * 
	 * @author Fox
	 * @since 1.0.0
	 */
	var cms_parallax = $('.cms_parallax');
	if(cms_parallax.length > 0){
		cms_parallax.each(function() {
			"use strict";
			var speed = $(this).attr('data-speed');
			
			speed = (speed != undefined && speed != '') ? speed : 0.1 ;
			
			$(this).parallax("50%", speed);
		});
	}
	
	/** smoothscroll */
	
	
	/**
	 * Back To Top
	 * 
	 * @author Fox
	 * @since 1.0.0
	 */
	$('body').on('click', '#back_to_top', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1500);
    });

    /* Show Tooltip */
    $('.cs-social.default [data-rel="tooltip"]').tooltip();
    $('.single-gallery-wrap [data-rel="tooltip"]').tooltip();
	/* Replae placeholder input mail newsletter */
	$('#sidebar #searchform').find("input[type='text']").each(function(ev) {
	    if(!$(this).val()) { 
	        $(this).attr("placeholder", "Search...");
	    }
	});
	$('#searchform').find("input[type='text']").each(function(ev) {
	    if(!$(this).val()) { 
	        $(this).attr("placeholder", "Type Your Search Words");
	    }
	});

	$('.tnp-field-email').find("input[type='email']").each(function(ev) {
	    if(!$(this).val()) { 
	        $(this).attr("placeholder", "Subscribe Our Newsletter");
	    }
	});
	
	/* Show or Hide Buttom  */
	function cms_back_to_top(){
		/* Back To Top */
        if (scroll_top < window_height) {
        	$('#back_to_top').addClass('off').removeClass('on');
        } else {
        	$('#back_to_top').removeClass('off').addClass('on');
        }
	}
	
	/* Hide search form. */
	$(document).on('click',function(e){
		
		if(e.target.className == 'cshero-popup-search open')
		
		$('.cshero-popup-search').removeClass('open');
    });

	/**
	 * Auto width video iframe
	 * 
	 * Youtube Vimeo.
	 * @author Fox
	 */
	function cms_auto_video_width() {
		$('.entry-video iframe').each(function(){
			var v_width = $(this).width();
			
			v_width = v_width / (16/9);
			$(this).attr('height',v_width + 35);
		})
	}	
	/**
	 * Enscroll
	 * 
	 * 
	 * @author Fox
	 */
	function cms_enscroll() {
		$('.cshero-hidden-sidebar .sidebar-inner').enscroll();
		$('#cshero-header-left').enscroll();
		$('.cshero-popup-menu .menu-main-menu').enscroll();
	}

	/**
	 * Add Class
	 * 
	 * 
	 * @author Fox
	 */
	function cms_add_class() {
	    $(".cart-contents").on('click',function(){
			$('.widget_shopping_cart').toggleClass('open');
	    })
	    $(".nav-button-icon .fa-search").on('click',function(){
			$('.widget-search-header').toggleClass('open');
	    })
	    $(".nav-button-icon .fa-shopping-cart").on('click',function(){
			$('.widget_shopping_cart').toggleClass('open');
	    })

	    $("#cshero-header-navigation .hidden-sidebar").on('click',function(){
			$('.cshero-hidden-sidebar').toggleClass('open');
			$('#cms-theme').toggleClass('hidden-sidebar-active');
	    })
	    $(".get-form-quote").on('click',function(){
			$('.quote-form-popup-wrapper').addClass('open');
	    })
	    $(".quote-form-popup-wrapper .form-close").on('click',function(){
			$('.quote-form-popup-wrapper').removeClass('open');
	    })

	    $( "<div class='tparrows-wrapper1'></div>" ).insertAfter( ".rev_slider .tparrows:last-child" );
	    
	}
	/* Request Form */
	$('.request-form').parents('.wpcf7-form').addClass('request-form-active');

	/* Woo - Add class */
    $('.plus').on('click', function(){
    	$(this).parent().find('input[type="number"]').get(0).stepUp();
    });
    $('.minus').on('click', function(){
    	$(this).parent().find('input[type="number"]').get(0).stepDown();
    });
	/* Remove Search Popup & Hidden Sidebar */
	$(document).on('keyup',function(evt) {
	    if (evt.keyCode == 27) {
	       $('.quote-form-popup-wrapper').removeClass('open');
	       $('#cms-theme').removeClass('hidden-sidebar-active');
	    }
	});
	$(document).on('click',function(e){
		
		if(e.target.className == 'quote-form-popup-wrapper open')
		
		$('.quote-form-popup-wrapper').removeClass('open');
    });
	$('.sidebar-close').on('click',function(){
    	$('.cshero-hidden-sidebar').removeClass('open');
    	$('#cms-theme').removeClass('hidden-sidebar-active');
    });

	/* Mobile Menu Left */
    $('#cshero-menu-left-mobile').on('click',function(){
    	$('#cshero-menu-left-mobile .popup_menu').toggleClass('active');
    	$('.header-14').toggleClass('menu-left-open');
    });

    /* Video Light Box */
	$('.cms-button-video').magnificPopup({
		//disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
	/* Disnable Link */
    $(".dislink a").click(function() { return false; });
    /* Login + Register */

	$('.login-open').on('click',function(){
		$('.cms-login-wrap').addClass('open');
    });
    $('.register-open').on('click',function(){
		$('.cms-register-wrap').addClass('open');
    });
    $('.switch_to_login').on('click',function(){
    	$('.cms-register-wrap').removeClass('open');
		$('.cms-login-wrap').addClass('open');
    });
    $('.switch_to_sign_up').on('click',function(){
    	$('.cms-login-wrap').removeClass('open');
		$('.cms-register-wrap').addClass('open');
    });
    $(document).on('keyup',function(evt) {
	    if (evt.keyCode == 27) {
	       $('.cms-login-wrap').removeClass('open');
	       $('.cms-register-wrap').removeClass('open');
	    }
	});
	$(document).on('click',function(e){
		
		if(e.target.className == 'cms-login-wrap cms-popup open') {
			$('.cms-login-wrap').removeClass('open');
		}
		if(e.target.className == 'cms-register-wrap cms-popup open') {
			$('.cms-register-wrap').removeClass('open');
		}

    });

    $('.ytp-large-play-button').trigger('click');

    /* Section Overlay */
	$(".row-overlay").append( "<div class='row-overlay-inner'></div>" );

	/* Section Offset */
	function cms_section_offset() {
		if($(window).width() > 992) {
			var w_desktop = $(window).width();
			var w_padding = (w_desktop - 1140)/2;

			$('.section-offset-left > .vc_column-inner').css('padding-left',w_padding+'px');
			$('.section-offset-right > .vc_column-inner').css('padding-right',w_padding+'px');
		}
	}

	/* Menu Popup */
    $(".h-button-menu").on('click',function(){
		$('.cshero-popup-menu').toggleClass('open');
    })
    $(".menu-popup-close").on('click',function(){
		$('.cshero-popup-menu').removeClass('open');
    })
	




         /******************************************
                    -	PREPARE PLACEHOLDER FOR SLIDER	-
                ******************************************/

                var setREVStartSize=function(){
                    try{var e=new Object,i=jQuery(window).width(),t=9999,r=0,n=0,l=0,f=0,s=0,h=0;
                        e.c = jQuery('#rev_slider_1_1');
                        e.gridwidth = [1140];
                        e.gridheight = [799];
                                
                        e.sliderLayout = "fullscreen";
                        e.fullScreenAutoWidth='off';
                        e.fullScreenAlignForce='off';
                        e.fullScreenOffsetContainer= '';
                        e.fullScreenOffset='';
                        if(e.responsiveLevels&&(jQuery.each(e.responsiveLevels,function(e,f){f>i&&(t=r=f,l=e),i>f&&f>r&&(r=f,n=e)}),t>r&&(l=n)),f=e.gridheight[l]||e.gridheight[0]||e.gridheight,s=e.gridwidth[l]||e.gridwidth[0]||e.gridwidth,h=i/s,h=h>1?1:h,f=Math.round(h*f),"fullscreen"==e.sliderLayout){var u=(e.c.width(),jQuery(window).height());if(void 0!=e.fullScreenOffsetContainer){var c=e.fullScreenOffsetContainer.split(",");if (c) jQuery.each(c,function(e,i){u=jQuery(i).length>0?u-jQuery(i).outerHeight(!0):u}),e.fullScreenOffset.split("%").length>1&&void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0?u-=jQuery(window).height()*parseInt(e.fullScreenOffset,0)/100:void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0&&(u-=parseInt(e.fullScreenOffset,0))}f=u}else void 0!=e.minHeight&&f<e.minHeight&&(f=e.minHeight);e.c.closest(".rev_slider_wrapper").css({height:f})
                        
                    }catch(d){console.log("Failure at Presize of Slider:"+d)}
                };
                
                setREVStartSize();
                
                            var tpj=jQuery;
                
                var revapi1;
                tpj(document).ready(function() {
                    if(tpj("#rev_slider_1_1").revolution == undefined){
                        revslider_showDoubleJqueryError("#rev_slider_1_1");
                    }else{
                        revapi1 = tpj("#rev_slider_1_1").show().revolution({
                            sliderType:"standard",
                            jsFileLocation:"//7oroof.com/tfdemos/wp-yellow-hats/wp-content/plugins/revslider/public/assets/js/",
                            sliderLayout:"fullscreen",
                            dottedOverlay:"none",
                            delay:9000,
                            navigation: {
                                keyboardNavigation:"off",
                                keyboard_direction: "horizontal",
                                mouseScrollNavigation:"off",
                                mouseScrollReverse:"default",
                                onHoverStop:"off",
                                arrows: {
                                    style:"custom",
                                    enable:true,
                                    hide_onmobile:false,
                                    hide_onleave:false,
                                    tmp:'',
                                    left: {
                                        h_align:"left",
                                        v_align:"bottom",
                                        h_offset:80,
                                        v_offset:35
                                    },
                                    right: {
                                        h_align:"left",
                                        v_align:"bottom",
                                        h_offset:120,
                                        v_offset:35
                                    }
                                }
                            },
                            visibilityLevels:[1240,1024,778,480],
                            gridwidth:1140,
                            gridheight:799,
                            lazyType:"none",
                            shadow:0,
                            spinner:"spinner0",
                            stopLoop:"off",
                            stopAfterLoops:-1,
                            stopAtSlide:-1,
                            shuffle:"off",
                            autoHeight:"off",
                            fullScreenAutoWidth:"off",
                            fullScreenAlignForce:"off",
                            fullScreenOffsetContainer: "",
                            fullScreenOffset: "",
                            disableProgressBar:"on",
                            hideThumbsOnMobile:"off",
                            hideSliderAtLimit:0,
                            hideCaptionAtLimit:0,
                            hideAllCaptionAtLilmit:0,
                            debugMode:false,
                            fallbacks: {
                                simplifyAll:"off",
                                nextSlideOnWindowFocus:"off",
                                disableFocusListener:false,
                            }
                        });
                    }
                });	/*ready*/
     
                var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
                if(htmlDiv) {
                    htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
                }
                else{
                    var htmlDiv = document.createElement('div');
                    htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
                    document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
                }
    

                var htmlDiv = document.getElementById("rs-plugin-settings-inline-css"); var htmlDivCss="";
                if(htmlDiv) {
                    htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
                }else{
                    var htmlDiv = document.createElement("div");
                    htmlDiv.innerHTML = "<style>" + htmlDivCss + "</style>";
                    document.getElementsByTagName("head")[0].appendChild(htmlDiv.childNodes[0]);
                }


});