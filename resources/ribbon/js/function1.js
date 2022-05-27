/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    $('.toggle').on('click', function () {
        $('.container').stop().addClass('active');
    });
///
    $('.close').on('click', function () {
        $('.container').stop().removeClass('active');
    });


//for menu hide show in db click

//for db click open fix
$('#menu .panel-heading .nav li a').dblclick(function(){
    $(' #menu .panel-body').toggle("slow");
     $('#menu .panel-body').toggleClass('fixed');
      $('#menu .panel-body').removeClass('showClick');
     $('#container').toggleClass('cont-margin-top', 10000, 'slow');
	 if(ribbonstate==0)
	 {
		ribbonstate=1; 
		onribbonexpand();
	 }
	 else
	 {
		ribbonstate=0; 
		onribboncolapse(); 
	 }
	 
});

function expandribbon()
{
	if(ribbonstate==0)
	{
	$(' #menu .panel-body').toggle("slow");
     $('#menu .panel-body').toggleClass('fixed');
      $('#menu .panel-body').removeClass('showClick');
     $('#container').toggleClass('cont-margin-top', 10000, 'slow');
	 onribbonexpand();
	}
}
function colapseribbon()
{
	if(ribbonstate==1)
	{
	$(' #menu .panel-body').toggle("slow");
     $('#menu .panel-body').toggleClass('fixed');
      $('#menu .panel-body').removeClass('showClick');
     $('#container').toggleClass('cont-margin-top', 10000, 'slow');
	 onribboncolapse();
	}	
}


//for hide single click menu:  Hides on outer single click
$('body').on('click', function(e) {
    if($(e.target).closest('#menu').length){
        return;
    }
        if($('#menu .panel-body').hasClass('showClick')){
         $('#menu .panel-body').removeClass('showClick');
     }
    
    });

//for single click show : For single click show ribbon
$('#menu .panel-heading .nav li a').on('click', function() {
    if($('#menu .panel-body').hasClass('fixed')){
            //.css('display')=='none'){
        $('#menu .panel-body').css('display','block');
//        alert('helo');
        
    }else{
		$('#menu .panel-body').addClass('showClick');
            }

});
	
	
    $("#home-sub-menu").hover(function () {
//alert('hi');
        $(".custom-drop").css({display: "inline"});//addClass('open');
    }, function () {

        $(".custom-drop").css({display: "none"});//removeClass('open');
    });




    //
    $('.variable-width').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 7,
        centerMode: false,
        variableWidth: true
    });

$(function () {
        $('[data-toggle="popover"]').popover({
            container: 'body',
            html: true,
            content: function () {
                var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
                return clone;
            }
        })
    });
//$('[data-toggle="popover"]').popover();

$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});

var selector = '.inset .menu-ribbon li';

$(selector).on('click', function(){
	//alert('hello');
    $(selector).removeClass('active-menu-ribbon');
    $(this).addClass('active-menu-ribbon');
});


});
//
$(document).on('click', function(e) {
  $('[data-toggle="popover"],[data-original-title]').each(function() {
    //the 'is' for buttons that trigger popups
    //the 'has' for icons within a button that triggers a popup
    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      $(this).popover('hide').data('bs.popover').inState.click = false; // fix for BS 3.3.6
    }

  });
  });