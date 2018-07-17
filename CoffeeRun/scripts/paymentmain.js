(function(window) {
  "use strict";

  var PAYMENT_SELECTOR = "[data-payment-form=\"form\"]";
  var App = window.App;
  var PayHandler = App.PayHandler;
  var ValidateExpiryDate = App.ValidateExpiryDate;
  var payhandler = new PayHandler(PAYMENT_SELECTOR);

  payhandler.addInputHandler(ValidateExpiryDate.isValidateExpiryDate);
  payhandler.addSubmitHandler(function() {});

})(window);
