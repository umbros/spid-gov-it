$(function() {
    var hash = document.location.hash;
    console.log("HASH:");
    console.log(hash);
    if (hash) {
        $(hash).click();
        $('html, body').animate({
            'scrollTop' : $(hash).position().top - 100
        });        
    }
});