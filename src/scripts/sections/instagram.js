/*============================================================================
  Instagram on index
==============================================================================*/
theme.Instagram = (function() {
  function Instagram(container) {
    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');
    var instafeedEl = this.instagram = $('#instafeed-' + id);
    var instafeedId = this.instagram = 'instafeed-' + id;
    var template = $("#instagram-template").html();
    var userFeed = new Instafeed({
      get: 'user',
      limit: 3,
      userId: 'self',
      target: instafeedId,
      accessToken: instafeedEl.attr('data-access-token'),
      resolution: 'standard_resolution',
      template: template
    });
    if( !_.isUndefined( userFeed.options.accessToken) ){
      userFeed.run();
    }
  }
  Instagram.prototype = _.assignIn({}, Instagram.prototype, {});
  return Instagram;
})();


$(document).ready(function() {
    var windowWidth = $(window).width();
    if (windowWidth < 768) {

        setTimeout(function() {
            mob_instagram_slick();
        }, 5000);
    }
});

$(window).on('resize orientationchange', function() {
    var windowWidth = $(window).width();
    if (windowWidth < 768) {

        setTimeout(function() {
            mob_instagram_slick();
        }, 2000);
    }
});

function mob_instagram_slick() {
    $('.instafeed-mob-slider').slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 2, // default desktop values
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 480, // mobile breakpoint
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
}
