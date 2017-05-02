(function ($) {
    "use strict";
    $(document).ready(function(){
        var $menu = $('.main-navigation');
        $menu.find('li').each(function(){
            var $submenu = $(this).find('> ul');
            if($submenu.length == 1){
                $(this).on('hover', function(){
                    if($submenu.offset().left + $submenu.width() > $(window).width()){
                        $submenu.addClass('back');
                    }else if($submenu.offset().left < 0){
                        $submenu.addClass('back');
                    }
                });
            }
        });
        
        /* Menu drop down*/
        $('.nav-menu li.menu-item-has-children').append('<span class="cs-menu-toggle"></span>');
        $('.cs-menu-toggle').on('click',function(){
            $(this).prev().toggleClass('submenu-open');
            $(this).prev().fadeToggle('slow');
        });

        /* Menu Popup */
        var nav_height = $('.cshero-popup-menu .menu-main-menu').height();
        $('.cshero-popup-menu .menu-main-menu').css('height',nav_height+'px');
    });
})(jQuery);
