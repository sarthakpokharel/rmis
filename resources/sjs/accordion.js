// JavaScript Document

$(document).ready(function(e) {
	$('.accordion-menu > li > ul').toggle(false);
	$('.accordion-menu > li > ul:eq(0)').toggle(true);
	$(".accordion-menu > li > div").click(function(){
	 
		if(false == $(this).next().is(':visible')) {
			$(this).parents().nextAll().children('ul.accordion-menu').slideUp(300);
			$(this).parents().prevAll().children('ul.accordion-menu').slideUp(300);
		}
		$(this).next().slideToggle(300);
	});
	$('.accordion-menu2 > li > ul').toggle(false);
	$('.accordion-menu2 > li > ul:eq(0)').toggle(true);
	$(".accordion-menu2 > li > div").click(function(){
	 
		if(false == $(this).next().is(':visible')) {
			$(this).parents().nextAll().children('ul.accordion-menu2').slideUp(300);
			$(this).parents().prevAll().children('ul.accordion-menu2').slideUp(300);
		}
		$(this).next().slideToggle(300);
	});
 
});
