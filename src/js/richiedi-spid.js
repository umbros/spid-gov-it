$('.spid-idp-details-row').each(function() {
    var $accordion = $(this);
    $accordion.find('.accordion-arrow').addClass('accordion-arrow-open');
    $accordion.on('click', function (){
        var $a = $(this);

        if (($a.next()[0]!=null && $a.next()[0].scrollHeight>5)) {
            $a.find('.accordion-arrow').removeClass('accordion-arrow-close');
            $a.find('.accordion-arrow').addClass('accordion-arrow-open');
            $a.find('.more').removeClass('responsive-hide-sm');
            $a.next().next().addClass('responsive-hide-sm');
        } else {
            $a.find('.accordion-arrow').removeClass('accordion-arrow-open');
            $a.find('.accordion-arrow').addClass('accordion-arrow-close'); 
            $a.find('.more').addClass('responsive-hide-sm');               
            $a.next().next().removeClass('responsive-hide-sm');
        }   
    });
});

$('.spid-idp-details-row-close').each(function() {
    var $close = $(this);
    var $panel = $close.prev();
    var $a = $panel.prev();

    $close.on('click', function (){
        $a.trigger("click");
        $('html, body').animate({
            'scrollTop' : $a.position().top - $('header').height()
        });        
    });
});


$("#accordion-header-0").on('click',function() {
    if(!($('#accordion-panel-0').parent().parent()[0].scrollHeight>5)) {
        $('html, body').animate({
            'scrollTop' : $("#accordion-header-0").position().top - $('header').height()
        });
    }
});
$("#accordion-header-1").on('click',function() {
    if(!($('#accordion-panel-1').parent().parent()[0].scrollHeight>5)) {        
        $('html, body').animate({
            'scrollTop' : $("#accordion-header-1").position().top - $('header').height()
        });
    }
});
$("#accordion-header-2").on('click',function() {
    if(!($('#accordion-panel-2').parent().parent()[0].scrollHeight>5)) {        
        $('html, body').animate({
            'scrollTop' : $("#accordion-header-2").position().top - $('header').height()
        });
    }
});
$("#accordion-header-3").on('click',function() {
    if(!($('#accordion-panel-3').parent().parent()[0].scrollHeight>5)) {        
        $('html, body').animate({
            'scrollTop' : $("#accordion-header-3").position().top - $('header').height()
        });
    }
});
$("#accordion-header-4").on('click',function() {
    if(!($('#accordion-panel-4').parent().parent()[0].scrollHeight>5)) {        
        $('html, body').animate({
            'scrollTop' : $("#accordion-header-4").position().top - $('header').height()
        });
    }
});
$("#accordion-header-5").on('click',function() {
    if(!($('#accordion-panel-5').parent().parent()[0].scrollHeight>5)) {        
        $('html, body').animate({
            'scrollTop' : $("#accordion-header-5").position().top - $('header').height()
        });
    }
});
$("#accordion-header-6").on('click',function() {
    if(!($('#accordion-panel-6').parent().parent()[0].scrollHeight>5)) {        
        $('html, body').animate({
            'scrollTop' : $("#accordion-header-6").position().top - $('header').height()
        });
    }
});
$("#accordion-header-7").on('click',function() {
    if(!($('#accordion-panel-7').parent().parent()[0].scrollHeight>5)) {        
        $('html, body').animate({
            'scrollTop' : $("#accordion-header-7").position().top - $('header').height()
        });
    }
});