/*Scroll*/
!function(t){'use strict';t('a.page-scroll').bind('click',function(a){var o=t(this);t('html, body').stop().animate({scrollTop:t(o.attr('href')).offset().top-60},500,'easeInOutExpo'),a.preventDefault()}),t('body').scrollspy({target:'.navbar-fixed-top',offset:100}),t('.navbar-collapse ul li a').click(function(){t('.navbar-toggle:visible').click()}),t('#mainNav').affix({offset:{top:50}})}(jQuery);

/*Slider*/
$('.banner-img').owlCarousel({
      items:1,
     animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    singleItem:true,
    lazyLoad: true,
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    nav:false,
    pagination:true,
})
$('#gallery').owlCarousel({
      items:1,
     animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    singleItem:true,
    lazyLoad: true,
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    nav:false,
    pagination:true,
})
 $('.testimonials').owlCarousel({
     items:1,
     animateOut: 'slideOutRight',
    animateIn: 'slideInLeft',
    singleItem:true,
    lazyLoad: true,
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    nav:false,
    pagination:true,
})   
/*Tabs sliding*/
$('ul.menu-tabs li a').click(function(){ 
    var tab_id = $(this).attr('data-id');
    $('ul.menu-tabs li').removeClass('tab-active');
    $('.tab-content').removeClass('tab-content-active');
    $(this).closest('li').addClass('tab-active');
    $('#'+tab_id).addClass('tab-content-active');
})


/*Youtube video popup*/
$('.video-thumb').click(function(e) {
	var dataSource = $(this).attr('data-url');
	$('body').append('<div class="popup-overlay"></div>').addClass('popup-active');
	$('.popup-iframe').attr('src',dataSource);
});

/* Popup*/
$(document).on('click','.popup-close', function(){
	$('body').removeClass('popup-active');
	$('.popup-overlay').remove();
	$('.popup-iframe').attr('src','');
})

/*Faq*/
$('.faq-item h3').prepend('<i class="glyphicon glyphicon-plus"></i>');       
$('.faq-item h3').click(function() {
    var linkTop = $(this)
	$('.faq-item h3').removeClass('open');
	$('.faq-item .accordion').slideUp('normal');
	if($(this).next().is(':hidden') == true) {
		$(this).addClass('open');
		$(this).next().slideDown(function() { 
            $('html,body').animate({
			scrollTop: linkTop.offset().top - 70
		}) 
            
        });
	} 							
});
var $body = $('body');
var $window = $(window);
function checkWidth() {
var windowsize = $window.width();
    if (windowsize > 767) {
		$body.removeClass('layout-mobile');
		$body.addClass('layout-desktop');	
    }
    else {	
		$body.removeClass('layout-desktop');
		$body.addClass('layout-mobile');
    }
}
checkWidth();
$(window).resize(checkWidth);

/*init wow*/
new WOW().init();