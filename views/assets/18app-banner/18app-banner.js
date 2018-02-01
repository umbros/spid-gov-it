/*
**************************************************
*       AGID BANNER - UmbRos 14092016 v1.0       *
**************************************************
*/

function agidBannerAddCss(agidBannerCssCode) {
    var agidBannerStyle = document.createElement('style');
    agidBannerStyle.type = 'text/css';
    agidBannerStyle.media = 'screen';
    agidBannerStyle.innerText = agidBannerCssCode;
    document.getElementsByTagName('head')[0].appendChild(agidBannerStyle);
}

switch (agidBannerSize) {
    case 'S':
        var agidBannerSizeWidth      = '150px';
        var agidBannerSizeHeight     = '190px';
        var agidBannerBrandSize      = '1.8em';
        var agidBannerSloganSize     = '1.0em';
        var agidBannerMoreInfosSize  = '.7em';
        var agidBannerVerticalSpace1 = '8px';
        var agidBannerVerticalSpace2 = '6px';
        break;
    case 'M':
        var agidBannerSizeWidth      = '200px';
        var agidBannerSizeHeight     = '240px';
        var agidBannerBrandSize      = '2em';
        var agidBannerSloganSize     = '1.5em';
        var agidBannerMoreInfosSize  = '.8em';
        var agidBannerVerticalSpace1 = '9px';
        var agidBannerVerticalSpace2 = '7px';
        break;
    case 'L':
        var agidBannerSizeWidth      = '250px';
        var agidBannerSizeHeight     = '290px';
        var agidBannerBrandSize      = '2.5em';
        var agidBannerSloganSize     = '1.8em';
        var agidBannerMoreInfosSize  = '.9em';
        var agidBannerVerticalSpace1 = '11px';
        var agidBannerVerticalSpace2 = '10px';
        break;
    default:
        var agidBannerSizeWidth      = '100%';
        var agidBannerSizeHeight     = '290px';
        var agidBannerBrandSize      = '2.5em';
        var agidBannerSloganSize     = '1.8em';
        var agidBannerMoreInfosSize  = '.9em';
        var agidBannerVerticalSpace1 = '11px';
        var agidBannerVerticalSpace2 = '10px'; 
}

switch (agidBannerLanguage) {
    case 'EN':
        var agidBannerSloganLine1 = 'QUI PUOI SPENDERE';
        var agidBannerSloganLine2 = 'IL TUO BONUS CULTURA';
        var agidBannerMoreInfos   = 'Maggiori informazioni';
        break;
    default:
        var agidBannerSloganLine1 = 'QUI PUOI SPENDERE';
        var agidBannerSloganLine2 = 'IL TUO BONUS CULTURA';
        var agidBannerMoreInfos   = 'Maggiori informazioni';
}

switch (agidBannerCorner) {
    case 'P':
        var agidBannerCornerValue = '';
        var agidBannerCornerCss = '';
        break;
    default:
        var agidBannerCornerValue = '9px';
        var agidBannerCornerCss = '-moz-border-radius:'+agidBannerCornerValue+';-webkit-border-radius:'+agidBannerCornerValue+';-khtml-border-radius:'+agidBannerCornerValue+';border-radius:'+agidBannerCornerValue+';';
}
    
var agidBannerCssCode = '#agidBanner{background:#0066cc;background:-webkit-radial-gradient(circle,#0066cc,#004ab9);background:-o-radial-gradient(circle,#0066cc,#004ab9);background:-moz-radial-gradient(circle,#0066cc,#004ab9);background:radial-gradient(circle,#0066cc,#004ab9);'+agidBannerCornerCss+'color:#ffffff;margin:0auto;padding:0;height:'+agidBannerSizeHeight+';width:'+agidBannerSizeWidth+';text-align:center}';
agidBannerCssCode    += '#agidBannerLogo{height:40%;margin-top:.8em}';
agidBannerCssCode    += '#agidBannerBrand{display:block;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:700;font-size:'+agidBannerBrandSize+';letter-spacing:-.05em;color:#FFFFFF;margin:0;padding:0;margin-top:-10px;margin-bottom:'+agidBannerVerticalSpace1+';}';
agidBannerCssCode    += '#agidBannerSlogan{display:block;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:100;font-size:'+agidBannerSloganSize+';color:#FFFFFF;margin:0;padding:0;}';
agidBannerCssCode    += '#agidBannerMoreInfo a, a:visited{display:block;text-decoration:none;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-size:'+agidBannerMoreInfosSize+';color:#FFFFFF;margin:0;padding:0;margin-top:'+agidBannerVerticalSpace2+';}';
agidBannerCssCode    += '#agidBannerMoreInfo a:hover{text-decoration:underline;}';
agidBannerAddCss(agidBannerCssCode);

document.open();
document.write('<div id="agidBanner">');
document.write('<img id="agidBannerLogo" src="18app-banner/18app-logo.svg" onerror="this.src=\'18app-banner/18app-logo.png\'; this.onerror=null;" alt="" />');
document.write('<span id="agidBannerBrand">18app</span>');
document.write('<span id="agidBannerSlogan">'+agidBannerSloganLine1+'</span>');
document.write('<span id="agidBannerSlogan">'+agidBannerSloganLine2+'</span>');
document.write('<span id="agidBannerMoreInfo"><a href="http://www.18app.it">'+agidBannerMoreInfos+'</a></span>');
document.write('</div>');
document.close();


