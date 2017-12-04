/*Scroll*/
!function(t){'use strict';t('a.page-scroll').bind('click',function(a){var o=t(this);t('html, body').stop().animate({scrollTop:t(o.attr('href')).offset().top-50},500,'easeInOutExpo'),a.preventDefault()}),t('body').scrollspy({target:'.navbar-fixed-top',offset:100}),t('.navbar-collapse ul li a').click(function(){t('.navbar-toggle:visible').click()}),t('#mainNav').affix({offset:{top:50}})}(jQuery);
/**
 * Plugin for linking multiple owl instances
 * @version 1.0.0
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
    /**
     * Creates the Linked plugin.
     * @class The Linked Plugin
     * @param {Owl} carousel - The Owl Carousel
     */
    var Linked = function(carousel) {
        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this._core = carousel;

        /**
         * All event handlers.
         * @protected
         * @type {Object}
         */
        this._handlers = {
            'dragged.owl.carousel changed.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.linked) {
                    this.update(e);
                }
            }, this),
            'linked.to.owl.carousel': $.proxy(function(e, index, speed, standard, propagate) {
                if (e.namespace && this._core.settings.linked) {
                    this.toSlide(index, speed, propagate);
                }
            }, this)
        };

        // register event handlers
        this._core.$element.on(this._handlers);

        // set default options
        this._core.options = $.extend({}, Linked.Defaults, this._core.options);
    };

    /**
     * Default options.
     * @public
     */
    Linked.Defaults = {
        linked: false
    };

    /**
     * Updated linked instances
     */
    Linked.prototype.update = function(e) {
        this.toSlide( e.relatedTarget.relative(e.item.index) );
    };

    /**
     * Carry out the to.owl.carousel proxy function
     * @param {int} index
     * @param {int} speed
     * @param {bool} propagate
     */
    Linked.prototype.toSlide = function(index, speed, propagate) {
        var id = this._core.$element.attr('id'),
            linked = typeof(this._core.settings.linked) === 'string' ? this._core.settings.linked.split(',') : this._core.settings.linked;

        if ( typeof propagate == 'undefined' ) {
            propagate = true;
        }

        index = index || 0;

        if ( propagate ) {
            $.each(linked, function(i, el){
                $(el).trigger('linked.to.owl.carousel', [index, 300, true, false]);
            });
        } else {
            this._core.$element.trigger('to.owl.carousel', [index, 300, true]);

            if ( this._core.settings.current ) {
                this._core._plugins.current.switchTo(index);
            }
        }
    };

    /**
     * Destroys the plugin.
     * @protected
     */
    Linked.prototype.destroy = function() {
        var handler, property;

        for (handler in this._handlers) {
            this.$element.off(handler, this._handlers[handler]);
        }
        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] != 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.linked = Linked;

})(window.Zepto || window.jQuery, window, document);
/*Init slider 1*/
var carouselImage = $('.carousel_1');
var carouselText = $('.carousel_2');
carouselImage.owlCarousel({ nav: false, navText: ['', ''], items: 1, margin: 0, dots : false, linked: '.carousel_2'});
carouselText.owlCarousel({ nav: true,  navText: ['', ''], loop: false, dots: false, items: 1, margin: 0, linked: '.carousel_1',
  onInitialize: function() {
  $(this.$element).find('.owl-item.current').removeClass('current');
  var current = $(this.$element).find('.owl-item.active.center').length ? $(this.$element).find('.owl-item.active.center') : $(this.$element).find('.owl-item.active').eq(0);
  current.addClass('current');
  console.log(current);
  }
}).on('initialized.owl.carousel link.to.owl.carousel', function() {
  $(this).find('.owl-item.current').removeClass('current');
  var current = $(this).find('.owl-item.active.center').length ? $(this).find('.owl-item.active.center') : $(this).find('.owl-item.active').eq(0);
  current.addClass('current');
});

carouselImage.on('changed.owl.carousel',function(property){
    var current = property.item.index;
    var src = $(property.target).find('.owl-item').eq(current).find('img').attr('data-id');
    if(src == 5) {
        $('.step-count').css("visibility", "hidden");
    }
    else {
       $('.step-count').css("visibility", "visible");   
    }
    $('.step-count span').html(current+1);
});

/*Tabs sliding*/
$('ul.tabs li').click(function(){ 
	carouselImage.trigger('to.owl.carousel', [0, 500,true]);  
    var tab_id = $(this).attr('data-id');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $('#'+tab_id).addClass('current');
})

/* Show more results*/
$('.cta-more').click(function(){
	_this = $(this)
	$('.table-hidden-results').slideToggle(function() {
		_this.toggleClass('show-less')	
})
if($('.cta-more').hasClass('show-less')){
		$('.cta-more span').text('Show more');
}
else {
		$('.cta-more span').text('Show less');
	}
});

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
function isScrolledIntoView()
{
	var docHeight = $(document).outerHeight() - $('footer').outerHeight();
	var docFooterHeight = $('footer').outerHeight();
	var docStickyOffset = $('#sticky-anchor').offset().top
	var docStickyOffsetHeight = $('#sticky-anchor').outerHeight()
	var docCalcBottom =  (docStickyOffset + docStickyOffsetHeight) - docHeight
	if (docCalcBottom > 0) {
		$('.sticky-signup').css({bottom:docCalcBottom});
	}
	else {
		$('.sticky-signup').css({bottom:0})		
	}
}
$(window).scroll(function () {
	isScrolledIntoView();
})
/*init wow*/
isScrolledIntoView();
new WOW().init();