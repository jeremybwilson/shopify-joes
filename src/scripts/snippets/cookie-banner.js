/*============================================================================
 Cookie Banner
==============================================================================*/
$(document).ready(function () {
  (function cookie_banner() {

    // CHECK : Check cookie
    var check_banner_cookie = $.cookie('gdpr_banner_read');
    if (check_banner_cookie == null) {
      $.fancybox({
        href: "#cookie-banner--popup",
        tpl: {
          wrap: '<div class="fancybox-wrap" tabIndex="-1" id="cookie-banner--popup-wrapper"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        },
        helpers: {
          overlay: null
        },
        openEffect: 'elastic',
        closeEffect: 'fade'
      });

      // ACCEPT : Close gdpr banner and accept terms
      $('#cookie-banner--popup .button-close').click(function () {
        $.cookie('gdpr_banner_read', 'true', { expires: 180,path:"/" }); // make the cookie, expires in 180 days
        parent.$.fancybox.close();
      });
    }
  })();
});
