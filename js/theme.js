(function($){
"use strict"; // Start of use strict
//Tag Toggle
function toggle_tab(){
	if($('.toggle-tab').length>0){
		$('.toggle-tab').each(function(){
			$(this).find('.item-toggle-tab').first().find('.toggle-tab-content').show();
			$('.toggle-tab-title').on('click',function(){
				$(this).parent().siblings().removeClass('active');
				$(this).parent().toggleClass('active');
				$(this).parents('.toggle-tab').find('.toggle-tab-content').slideUp();
				$(this).next().stop(true,false).slideToggle();
			});
		});
	}
}	
//Banner Background
function banner_background(){
	if($('.banner-background').length>0){
		$('.banner-background').each(function(){
			var bn_src = $(this).find('.image-background').attr('src');
			$(this).css('background-image','url("'+bn_src+'")')
		});
	}
}
//Toggle Sidebar
function toggle_sidebar(){
	$('.toggle-sidebar').on('click',function(){
		$(this).toggleClass('active');
		$(this).next().slideToggle();
	});
}
//Menu Responsive
function rep_menu(){
	$('.toggle-mobile-menu').on('click',function(event){
		event.preventDefault();
		$(this).parents('.main-nav').toggleClass('active');
	});
	if($(window).width()<768){
		$('.main-nav li.menu-item-has-children>a').on('click',function(event){
			event.preventDefault();
			$(this).next().stop(true,false).slideToggle();
		});
	}
}
//Offset Menu
function offset_menu(){
	if($(window).width()>767){
		$('.main-nav .sub-menu').each(function(){
			var wdm = $(window).width();
			var wde = $(this).width();
			var offset = $(this).offset().left;
			var tw = offset+wde;
			if(tw>wdm){
				$(this).addClass('offset-right');
			}
		});
	}
}
//Detail Gallery
function detail_gallery(){
	if($('.gallery-thumb').length>0){
		$('.gallery-thumb').each(function(){
			$(this).jCarouselLite({
				btnNext: ".gallery-control .next",
				btnPrev: ".gallery-control .prev",
				speed: 800,
				visible:4,
				vertical: true
			});
		});
	}
	$(".gallery-thumb a").on('click',function(event) {
		event.preventDefault();
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');
		$(this).parents('.wrap-gallery-thumb').prev().find("img").attr("src", $(this).children().attr("src"));
	});
}
function fixed_header(){
	var ht = $('#header').height();
	var st = $(window).scrollTop();
	var sf = ht+100;
	if(st>ht){
		$('.scroll-fixed').addClass('nav-fixed');
	}else{
		$('.scroll-fixed').removeClass('nav-fixed');
	}
	if(st>sf){
		$('.scroll-fixed').addClass('nav-show');
	}else{
		$('.scroll-fixed').removeClass('nav-show');
	}
} 
//Slider Background
function background(){
	$('.bg-slider .item-slider').each(function(){
		var src=$(this).find('.banner-thumb a img').attr('src');
		$(this).css('background-image','url("'+src+'")');
	});	
}
function animated(){
	$('.banner-slider .owl-item').each(function(){
		var check = $(this).hasClass('active');
		if(check==true){
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).addClass(anime);
			});
		}else{
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).removeClass(anime);
			});
		}
	});
}
//Document Ready
jQuery(document).ready(function(){
	//Offset Menu
	offset_menu();
	//Responsive Menu
	rep_menu()
	//Banner Background
	banner_background();
	//Toggle Tab
	 toggle_tab();
	//Tech Pro Hover Thumb
	if($('.list-techpro').length>0){
		$('.list-techpro .item-techpro').on('mouseover',function(){
			var src = $(this).attr('data-image');
			$(this).parents('.list-techpro').find('.techpro-thumb img').hide().attr('src',src).fadeIn();
		});
	}
	//Owl Carousel
	if($('.wrap-item').length>0){
		$('.wrap-item').each(function(){
			var data = $(this).data();
			$(this).owlCarousel({
				addClassActive:true,
				stopOnHover:true,
				itemsCustom:data.itemscustom,
				autoPlay:data.autoplay,
				transitionStyle:data.transition, 
				paginationNumbers:data.paginumber,
				beforeInit:background,
				afterAction:animated,
				navigationText:['<span class="lnr lnr-chevron-left"></span>','<span class="lnr lnr-chevron-right"></span>'],
			});
		});
	}
	//Fixed Header
	if($(window).width()>1024){
		fixed_header();
		$(window).scroll(function(){
			fixed_header();
		});
	}
	//Toggle Sidebar
	if($(window).width()<768){
		toggle_sidebar();
	}
	//Toggle Filter
	$('body').on('click',function(){
		$('.box-product-filter').slideUp();
	});
	$('.toggle-filter').on('click',function(event){
		event.stopPropagation();
		event.preventDefault();
		$('.box-product-filter').slideToggle();
	});
	//Parrallax Scroll
	if($('.parralax-slider').length>0){
		$(window).scroll(function(){
			$('.item-parralax').each(function(){
				var stop = $(this).offset().top+$(this).height();	
				var st = $(window).scrollTop();
				var ost = $(this).offset().top;	
				if(st>ost && st<stop){
					$(this).addClass('parallax');
				}else{
					$(this).removeClass('parallax');
				}
			});
		});
		$('.item-parralax').each(function(){
			$(this).css('background-image','url("'+$(this).find('.parralax-thumb img').attr('src')+'")');
		});
	}
	//Category Toggle
	$('body').on('click',function(){
		$('.list-category-toggle').slideUp();
	});
	$('.category-toggle-link').on('click',function(event){
		event.stopPropagation();
		event.preventDefault();
		$('.list-category-toggle').slideToggle();
	});
	//Hover Mega Menu Dropdown
	$('.content-category-dropdown > ul > li.has-cat-mega').on('mouseover',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
	//Post Light Box
	$('.post-image-zoom').each(function(){
		$(this).on('click',function(event){
			event.preventDefault();
			$.fancybox.open($(this).prev().find('img').attr('src'));
		});
	});
	detail_gallery();
	$('.box-special-slider .owl-controls .owl-page').on('click',function(){
		detail_gallery();
	});
	$(window).resize(function(){
		detail_gallery();
		$('.news-info').each(function(){
			$(this).css('padding-top',($(this).innerHeight()-$(this).find('.inner-news-info').innerHeight())/2);
		});
	});
	//Toggle Product Cat 
	$('.widget.widget-shop-cat >.widget-content> ul > li.has-sub-cat>a').on('click',function(event){
		event.preventDefault();
		$('.widget.widget-shop-cat > .widget-content>ul > li.has-sub-cat').not($(this).parent()).removeClass('active');
		$(this).parent().toggleClass('active');
	});
	//Toggle Faqs 
	$('.widget.widget-faq h3').on('click',function(){
		$('.widget.widget-faq li').not($(this).parent()).removeClass('active');
		$(this).parent().toggleClass('active');
	});
	//Top Save Faq
	$('.top-save-accor li h2').on('click',function(){
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');
	});
	//Product Load More
	$('.content-best-seller3').each(function(){
		var x=parseInt($(this).find('.loadmore-item a').attr('data-num'),10)-1;
		$(this).find('li').eq(x).nextAll().slideUp();
	});
	$('.loadmore-item a').on('click',function (event) {
		event.preventDefault();
		var size_li = $(this).parent().prev().find('li').size();
		var x=parseInt($(this).attr('data-num'),10);
		$(this).attr('data-num',x+4);
		var x=Number($(this).attr('data-num'));
		$(this).parent().prev().find('li').eq(x).prevAll().slideDown();
		if($(this).attr('data-num')>size_li){
			$(this).parent().slideUp();
		}
	});
	//Toggle Nec Why Us
	$('.why-faq > li p').slideUp();
	$('.why-faq > li.active p').slideDown();
	$('.why-faq > li h3').on('click',function(){
		$(this).parent().siblings().removeClass('active');
		$(this).parent().stop(true,true).addClass('active');
		$(this).parent().siblings().find('p').slideUp();
		$(this).parent().find('p').slideDown();
	});
	//Filter Color
	$('.attr-filter-color ul li a').on('click',function(event){
		event.preventDefault();
		$('.attr-filter-color ul li').removeClass('active');
		$(this).parent().addClass('active');
	});
	//Filter Size
	$('.attr-filter-size ul li a').on('click',function(event){
		event.preventDefault();
		$('.attr-filter-size ul li').removeClass('active');
		$(this).parent().addClass('active');
	});
	//Filter Price
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 3000.00,
		values: [ 450.00, 2500.00 ],
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	//Back To Top
	$('.back-to-top').on('click',function(event){
		event.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow');
	});
	//Product Hover Dir
	$('.deal-week-product').each( function() {
		$(this).hoverdir(); 
	});
	//Category Hover Dir
	$('.inner-cat-icon').each( function() {
		$(this).hoverdir(); 
	});
	$('.item-cat-icon').on('mousemove',function(){
		$('.item-cat-icon').not($(this)).removeClass('active');
		$(this).addClass('active');
	});
	$('.list-cat-icon').on('mouseout',function(){
		$(this).addClass('hover-out');
	});
	$('.list-cat-icon').on('mousemove',function(){
		$(this).removeClass('hover-out');
	});
});
//Window Load
jQuery(window).on('load',function(){ 
	//Testimo Slider
	if($('.customer-review-slider').length>0){
		$('.customer-info').bxSlider({
			pagerCustom: '.customer-thumb',
			controls:false,
		});
	}
	//Product Gallery
	if($('.detail-gallery').length>0){
		$('.detail-gallery .bxslider').bxSlider({
			pagerCustom: '.detail-gallery .bx-pager',
			prevText:'<span class="lnr lnr-chevron-left"></span> <span class="control-text">Prev</span>',
			nextText:'<span class="control-text">Next</span> <span class="lnr lnr-chevron-right"></span>',
		});
	}
	//Fix Padding
	$('.news-info').each(function(){
		$(this).css('padding-top',($(this).innerHeight()-$(this).find('.inner-news-info').innerHeight())/2);
	});
});
})(jQuery); // End of use strict