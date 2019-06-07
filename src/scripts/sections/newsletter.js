/*============================================================================
  Footer Newsletter
==============================================================================*/

theme.Newsletter = function() {
    function Newsletter(container) {
        var $container = this.$container = $(container);
        var ui = {
            formId: $('#footer-newsletter'),
            textbox: $('#email'),
            submit: $('#button-footer-newsletter-submit'),
            errorMsg: $('#newsletter-error-response'),
            successMsg: $('#newsletter-success-response')
        };

        // EMAIL : Regex to check for a valid email
        var regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
        if (ui.formId) {
            ui.textbox.on('focus', function() { // ERROR STATE : Reset error state
                ui.formId.removeClass('has-error');
                ui.errorMsg.fadeOut();
            }); // SUBMIT : submit form event
            ui.formId.submit(function(e) {
                e.preventDefault(); // validation code
                var validEmail = regexEmail.test(ui.textbox.val());
                if (!validEmail) { // error state
                    ui.formId.addClass('has-error');
                    ui.errorMsg.fadeIn();
                } else { // success state
                    Sailthru.integration("userSignUp", {
                        "email": ui.textbox.val(),
                        "lists": {
                            "AQUA_Master_List": 1 // list to add user to (must exist in Sailthru account)
                                // "Anonymous" : 0 // list to remove user from (must exist in Sailthru account)
                        },
                        "source": "web",
                        "onSuccess": function onSuccess() {
                            var payload = {
                                email: ui.textbox.val(),
                                emailType: 'marketing',
                                interaction: 'On Email'
                            };
                            if (typeof window.__bva__ !== 'undefined' && typeof window.__bva__.helpers !== 'undefined') {
                                window.__bva__.helpers.fireEmailPixel(payload);
                            } else if (typeof dataLayer !== 'undefined') {
                                dataLayer.push(payload, {
                                    event: 'On Email'
                                });
                            }
                            ui.formId.fadeOut(function() {
                                ui.successMsg.fadeIn();
                            });
                        },
                        "onError": function onError(error) {
                            console.log("We encountered an issue signing you up. Please try again");
                            console.log(error);
                        }
                    });
                }
            });
        }
    }
    Newsletter.prototype = _.assignIn({}, Newsletter.prototype, {});
    return Newsletter;
}();
