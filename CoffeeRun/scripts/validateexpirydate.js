(function(window) {
  "use strict";
  var App = window.App || {};

  var ValidateExpiryDate = {
    isValidateExpiryDate: function(expirydate) {

      // Check month is 1 to 12 inclusive
      var b = expirydate.split("/");
      if (b[0] < 1 || b[0] > 12) {
        return "Expiry month must be from 01 to 12";
      }

      // Check is this month or later
      var d = new Date();
      var c = d.getFullYear() / 100 | 0 + "";
      if (new Date(c + b[1], b[0], 1) < d) {
        return "Expiry date must be this month or later";
      }
      return true;
    }
  };

  App.ValidateExpiryDate = ValidateExpiryDate;
  window.App = App;
})(window);
