/*============================================================================
  Other
==============================================================================*/
$(document).ready(function () {

    // HEADER STUFF : Once header is done we can probably move this into the header section component
    (function () {
        $(".has_sub_menu").hover(function () {
            $(this).attr('aria-expanded', function (index, attr) {
                return attr == 'false' ? true : 'false';
            });
        });

        /* Ensure that sub nav menus open to the left if any chance of offscreen overflow */
        $("ul.submenu li").on('mouseenter mouseleave', function (e) {
            if ($('ul', this).length) {
                var elm = $('ul:first', this);
                var off = elm.offset();
                var l = off.left;
                var w = elm.width();
                var docH = $("#PageContainer").height();
                var docW = $("#PageContainer").width();

                var isEntirelyVisible = (l + w <= docW);

                if (!isEntirelyVisible) {
                    $(this).addClass('edge');
                } else {
                    $(this).removeClass('edge');
                }
            }
        });


        /*============================================================================
        Shopify Section Load
        ==============================================================================*/
        $(document).on('shopify:section:load', function (event) {

            $('.no-fouc').removeClass('no-fouc');
            $('.load-wait').addClass('hide');

            // Responsive Navigation
            // JQUERY SHIFTER OVERRIDES THE ABILITY TO SET POSITION FIXED TO ANYTHING AND IS 4+ YEARS OUT OF DATE
            // $.shifter({
            //   maxWidth: "980px"
            // });

            /* Ensure that sub nav menus open to the left if any chance of offscreen overflow */
            $("ul.submenu li").on('mouseenter mouseleave', function (e) {
                if ($('ul', this).length) {
                    var elm = $('ul:first', this);
                    var off = elm.offset();
                    var l = off.left;
                    var w = elm.width();
                    var docH = $("#PageContainer").height();
                    var docW = $("#PageContainer").width();

                    var isEntirelyVisible = (l + w <= docW);

                    if (!isEntirelyVisible) {
                        $(this).addClass('edge');
                    } else {
                        $(this).removeClass('edge');
                    }
                }
            });
        });

    }());

    /* Stop the flash of unstyled content */
    $('.no-fouc').removeClass('no-fouc');
    $('.load-wait').addClass('hide');
});

$(document).on('click','.hidden_div',function(){
    $('.js-drawer-close').click();
});
