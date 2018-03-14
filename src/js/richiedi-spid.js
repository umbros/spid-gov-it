$('.spid-idp-details-row').each(function() {
    var $accordion = $(this);
    $accordion.find('.accordion-arrow').addClass('accordion-arrow-open');
    $accordion.on('click', function (){
        var $a = $(this);

        if (($a.next()[0]!=null && $a.next()[0].scrollHeight>3)) {
            $a.find('.accordion-arrow').removeClass('accordion-arrow-close');
            $a.find('.accordion-arrow').addClass('accordion-arrow-open');
        } else {
            $a.find('.accordion-arrow').removeClass('accordion-arrow-open');
            $a.find('.accordion-arrow').addClass('accordion-arrow-close');                
        }   
    });
});
