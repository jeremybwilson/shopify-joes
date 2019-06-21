require('./product/product-form.js');
require('./product/product-gallery.js');
require('./product/product-gallery-mobile.js');


// EVENTS EMITTER SETUP
var events = new EventEmitter3();
events.trigger = events.emit; // trigger alias


// PRODUCT COMPONENT
theme.Product = (function() {
    function Product(container) {
        const ui = {
            sizeChartPopup: $('#size-chart--popup'),
            freeShippingAccordionHeader: $('#free-shipping--accordion-header'),
            freeShippingAccordionContent: $('#free-shipping--accordion-content'),
            descriptionMobileTrigger: $('#product-description--mobile-dropdown-trigger'),
            descriptionMobileContent: $('#product-description--mobile-dropdown'),
            campaignVideoTrigger: $('.campaign-video--trigger')
        }

        theme.ProductGalleryMobile(events);

        container.querySelectorAll("[data-product-gallery]").forEach(function(context) {
            theme.ProductGallery(context, events);
        });

        container.querySelectorAll("[data-product-form]").forEach(function(context) {
            theme.ProductForm(context, events);
        });

        // BADGES : BUILD : Method to build react-badges component on collection updates (rebuilt in JS)
        const buildBadges = require('../react-components/badges/BadgeParent.js');

        $(document).ready(() => {
            // BADGES : Generate badge in div slot if present
            buildBadges();

            // FREE SHIPPING : Accordion
            if (ui.freeShippingAccordionContent.length > 0) {
                ui.freeShippingAccordionHeader.click(() => {
                    ui.freeShippingAccordionHeader.toggleClass('open');
                    ui.freeShippingAccordionContent.slideToggle(250);
                });
            }

            // DESCRIPTION : Accordion
            if (ui.descriptionMobileContent.length > 0) {
                ui.descriptionMobileTrigger.click(() => {
                    ui.descriptionMobileTrigger.toggleClass('open');
                    ui.descriptionMobileContent.slideToggle(350);
                });
            }

            // CAMPAIGN VIDEO
            if (ui.campaignVideoTrigger.length > 0) {
                ui.campaignVideoTrigger.fancybox({
                    width: 900,
                    height: 506,
                    padding: 0,
                    aspectRatio: true,
                    helpers: {
                        media: true,
                        overlay: {
                            locked: false
                        }
                    }
                });
            }

            // SIZE CHART
            if (ui.sizeChartPopup.length > 0) {
                var size_chart_type = ui.sizeChartPopup.data('size-chart-type');
                if (size_chart_type != 'all') {
                    ui.sizeChartPopup.find('.size-chart--wrapper').hide();
                    ui.sizeChartPopup.find('#size-chart--' + size_chart_type).show();
                }
            }
        });
    }

    Product.prototype = _.assignIn({}, Product.prototype, {});
    return Product;
})();

events.on("quickview:load", function(container) {
    theme.Product(container);
});

/*============================================================================
QUICK VIEW MODAL : Use Fancybox to Ajax in product quick view template
==============================================================================*/
$(document).on('click', '.product-quickview', function() {

    // Call Fancybox for product modal + stop scroll to top
    $('.product-quickview').fancybox({
        padding: 0,
        margin: 0,
        transitionIn: 'fade',
        afterShow: function afterShow() {
            var context = document.querySelector("#product-quick-view");
            theme.Product(context);
        },
        wrapCSS: 'fancybox-quickview',
        helpers: { overlay: { locked: false } }
    });
    return false;
});

/*============================================================================
QUICK VIEW MODAL : show/Hide more colres than 5
==============================================================================*/

$(document).on('click', '.show-more-product-color', function() {

    // Call Fancybox for product modal + stop scroll to top
    if($('.show-more-product-color').hasClass('color-open')){
        $('.show-more-product-color').removeClass('color-open');
        $('.show-more-product-color').text('more colors');
        $('.hide-more-color').toggle('slow');

    }else{
        $('.show-more-product-color').addClass('color-open');
        $('.show-more-product-color').text('less colors');
        $('.hide-more-color').toggle('slow');
    }
    return false;
});