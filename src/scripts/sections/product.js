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
            campaignVideoTrigger: $('.campaign-video--trigger'),
            detailAccordionHeader: $('#product-detail---accordion-header'),
            detailAccordionContent: $('#product-detail--accordion-content'),
            descriptionAccordionHeader: $('#product-description---accordion-header'),
            descriptionAccordionContent: $('#product-description--accordion-content'),
            fitAccordionHeader: $('#product-fit---accordion-header'),
            fitAccordionContent: $('#product-fit--accordion-content'),
            sizeChartPopup: $('#size-chart--popup'),
            showMoreColors: $('.show-more-product-color')
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

            // DETAIL : Accordion
            if (ui.detailAccordionContent.length > 0) {
                ui.detailAccordionHeader.click(() => {
                    ui.detailAccordionHeader.toggleClass('open');
                    ui.detailAccordionContent.slideToggle(350);
                });
            }

            // DESCRIPTION : Accordion
            if (ui.descriptionAccordionContent.length > 0) {
                ui.descriptionAccordionHeader.click(() => {
                    ui.descriptionAccordionHeader.toggleClass('open');
                    ui.descriptionAccordionContent.slideToggle(350);
                });
            }

            // FIT INFO : Accordion
            if (ui.fitAccordionContent.length > 0) {
                ui.fitAccordionHeader.click(() => {
                    ui.fitAccordionHeader.toggleClass('open');
                    ui.fitAccordionContent.slideToggle(350);
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

            // QUICKVIEW : Show More Colors
            if ( ui.showMoreColors.length ) {
                ui.showMoreColors.on( 'click', function() {
                  var isOpen = ui.showMoreColors.hasClass('color-open');

                  // SHOW/HIDE : More Colors In Quickview
                  if( isOpen ){
                    ui.showMoreColors.removeClass('color-open');
                    ui.showMoreColors.text('more colors');
                    $('.hide-more-color').toggle('slow');

                  } else {
                    ui.showMoreColors.addClass('color-open');
                    ui.showMoreColors.text('less colors');
                    $('.hide-more-color').toggle('slow');
                  }
                  return false;
                });
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
SIZE CHART : tab select (Applicable in Product and FAQ page)
==============================================================================*/
$(document).on('click', "#size-chart--popup [data-toggle='tab']", function(){
    var popup_section = $(this).data('section');
    $("#size-chart--popup #size-chart--"+ popup_section +" .nav-justified li").removeClass("active");
    $("#size-chart--popup #size-chart--"+ popup_section +" .tab-content .tab-pane").removeClass("active");

    $(this).parent("li").addClass("active");
    $("#size-chart--popup #size-chart--"+ popup_section +" .tab-content " + $(this).data("href")).addClass("active");
});

$(document).on('click', ".js-drawer-open-right", function(){
    window.sr_updateMessages();
});