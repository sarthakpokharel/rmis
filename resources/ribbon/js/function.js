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
    $('#menu .submenu-container ul li a').click(function(){
        $('#menu .submenu-container ul li a').removeClass("active");
        $(this).addClass("active");
    	
    });
timeoutact();




    $("#home-sub-menu").hover(function () {
//alert('hi');
        $(".custom-drop").css({display: "inline"});//addClass('open');
    }, function () {

        $(".custom-drop").css({display: "none"});//removeClass('open');
    });
    //
    // $('.variable-width').slick({
    //     dots: false,
    //     infinite: false,
    //     speed: 300,
    //     slidesToShow:2,
    //     centerMode: false,
    //     variableWidth: true
    // });

// $(function () {
//         $('[data-toggle="popover"]').popover({
//             container: 'body',
//             html: true,
//             content: function () {
//                 var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
//                 return clone;
//             }
//         });
//     });

});

//for db click open fix
$('#menu .panel-heading .nav li a').dblclick(function(){
    $(' #menu .panel-body').toggle("slow");
     $('#menu .panel-body').toggleClass('fixed');
      $('#menu .panel-body').removeClass('showClick');
     $('#container').toggleClass('cont-margin-top', 10000, 'slow');
});



//for single click show 
$('#menu .panel-heading .nav li a').on('click', function() {
    if($('#menu .panel-body').hasClass('fixed')){
            //.css('display')=='none'){
        $('#menu .panel-body').css('display','block');
//        alert('helo');
        
    }else{$('#menu .panel-body').addClass('showClick');
            }

});
//for hide single click menu
$('body').on('click', function(e) {
    if($(e.target).closest('#menu').length){
        return;
    }
        if($('#menu .panel-body').hasClass('showClick')){
         $('#menu .panel-body').removeClass('showClick');
     }
    
    });



//
$(document).on('click', function(e) {
  $('[data-toggle="popover"],[data-original-title]').each(function() {
	  //$("[data-toggle=popover]").popover();
    //the 'is' for buttons that trigger popups
    //the 'has' for icons within a button that triggers a popup
    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      $(this).popover('hide').data('bs.popover').inState.click = false; // fix for BS 3.3.6
      
    }

  });
  });
  
  ///////////////
  function timeoutact() {
	   if($('.slick-next').length){
          var  totalw=0;
            $('.slick-track .inset').each(function(){
                totalw+=$(this).width()+10;
            });
           
   //alert(totalw);
    var documentw=($(document).width());
    //alert(documentw);
    if(documentw>totalw){
        $('.slick-next').hide();
    }
    else{
        $('.slick-next').show();
    }
      }else{
         setTimeout(timeoutact, 10);
      }
      
  //$('#width').on('click',function(){
    
};