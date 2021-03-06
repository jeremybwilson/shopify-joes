theme.FitGuide = (function() {
    function FitGuide(container) {
        $(document).ready( () => {
            var collectionhandle = $(".collection-fit-guid-click:first").attr('data-collection-handle');
            var parent = $(".collection-fit-guid-click:first").parents('.fit-guid-collection-div');
            var is_first_time = 1;

            load_topslider(collectionhandle);
            load_products(collectionhandle,parent,is_first_time);
        });
        $(document).on('click','.collection-fit-guid-click',function(){
            var collectionhandle = $(this).attr('data-collection-handle');
            var parent = $(this).parents('.fit-guid-collection-div');

            if( $('.fit-image-slider').hasClass('slick-initialized') ) {
                $('.fit-image-slider').slick('unslick');
            }
            load_topslider(collectionhandle);
            load_products(collectionhandle,parent);
        });
    }
    function load_topslider(collectionhandle) {
        var slider_value = $('[data-id="fitsliderobject"]').attr('data-slider-value');

        var image_slider_array = ( slider_value != '' || typeof slider_value != "undefined" )? slider_value.split('::'): [];
        if (image_slider_array.length > 0){
            var slideCount = 0;
            var top_image_slider = '';
            $.each(image_slider_array, function (key, value) {
                var each_sliderimage = value.split('|');
                if ( $.trim(each_sliderimage[0]) == collectionhandle){
                    top_image_slider += '<div class="banner-only-images" data-section-id="fit-top-'+ collectionhandle +'">';
                    top_image_slider += '<img class="desktop_image" src="'+ $.trim(each_sliderimage[1]) +'" alt="desktop_banner">';
                    top_image_slider += '<img class="desktop_image" src="'+ $.trim(each_sliderimage[2]) +'" alt="mobile_banner">';
                    top_image_slider += '</div>';
                    slideCount ++;
                }
            });
            //$(".fit-image-slider").unslick();
            $(".fit-image-slider").html(top_image_slider);
            if (slideCount <=1) return true;
            $('.fit-image-slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed:false,
                centerPadding: '3px',
                responsive: [
                    {
                        breakpoint:991,
                        settings: {
                            centerMode: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            centerMode: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            centerMode: true,
                            dots: true
                        }
                    }
                ]
            });
        }
    }
    function load_products(collectionhandle,parent,is_first_time = 0) {
        var main_class_select_product = parent;
        var title = main_class_select_product.find('.name').html();
        var description = main_class_select_product.find('.fit-guid-description').html();
        var slider_html = "<div class='skinny-part'><h2>"+ title +"</h2><p>" + description + "</p><div class='skinny-slider'>";

        $.ajax({
            url: shop_url + "/collections/" + collectionhandle + "/products.json?limit=20",
            type: 'GET'
        })
        .done(function(data) {
            $(".banner-only-images").removeClass('active');
            $('[data-section-id="fit-top-'+collectionhandle+'"]').addClass('active');
            if(!is_first_time){
                $('html, body').animate({
                    scrollTop: $('[data-section-type="fit-guide"]').offset().top - $("#nav-bar-wrapper").height()
                }, 1000);
            }
            var products = data.products;
            $(products).each(function(index){//console.log(this);
                var img = (this.images.length > 0) ? this.images[0].src : no_image;
                var productsubtitle = '';
                var productfitguide_one = '';
                var productfitguide_two = '';
                $(this.tags).each(function () {
                    if (this.indexOf('subtitle_') != -1){
                        var findtag = this.split('subtitle_');
                        productsubtitle = findtag[1];
                    }
                    if (this.indexOf('fitguide_one_') != -1){
                        var findtag1 = this.split('fitguide_one_');
                        productfitguide_one = findtag1[1];
                    }
                    if (this.indexOf('fitguide_two_') != -1){
                        var findtag2 = this.split('fitguide_two_');
                        productfitguide_two = findtag2[1];
                    }
                });
                slider_html += "<div class='skinny-loop'>";
                slider_html += "<div class='skinny-images'>";
                slider_html += "<img src='" + img +"' alt='product image'>";
                slider_html += "</div>";
                slider_html += "<div class='sknny-detail'>";
                slider_html += "<h4>"+this.title+"</h4>";
                slider_html += "<h5>" + productsubtitle+ "</h5>";
                slider_html += "<p>" + productfitguide_one+ "</p>";
                slider_html += "<p>" + productfitguide_two+ "</p>";
                slider_html += "<a href='" + shop_url +"/products/" + this.handle + "' class='only-link-type-bitton'>Shop Now</a>";
                slider_html += "</div></div>";
            });
            slider_html += "</div></div>";
            $("#product-slider").html(slider_html);
            $('.skinny-slider').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed:false,
                centerPadding: '3px',
                responsive: [
                    {
                        breakpoint:991,
                        settings: {
                            centerMode: true,
                            slidesToShow:3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            centerMode: true,
                            dots: true,
                            slidesToShow:2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            centerMode: true,
                            dots: true,
                            slidesToShow: 1
                        }
                    }
                ]
            });
        })
        .fail(function(data) {})
        .always(function(data) {});
    }
    FitGuide.prototype = _.assignIn({}, FitGuide.prototype, {});
    return FitGuide;
})();