/* ----------------------------------------------------------------------------------------------------
 * EMAIL POPUP LOADER UTIL (used by snippets cookie-banner.js & newsletter-popup.js)
 * ---------------------------------------------------------------------------------------------------- */
module.exports = (function() {

    // LOAD : Email signup form popup (thing from bottom right of page)
    function email_popup_load() {
        var $popup = $('#myModal');
        if (!$popup.length > 0) {
            return false;
        }

        $.cookie('mailing_list_delay_popup', 'expires_seven_days', { expires: 7 });
        $.fancybox({
            href: "#myModal",
            helpers: {
                overlay: null
            },
            openEffect: 'elastic',
            closeEffect: 'fade'
        });

        $('.modal-content .close').click(function() {
            parent.$.fancybox.close();
        });
    };

    // PUBLIC UTIL METHODS
    return {
        email_popup_load
    };

})();
