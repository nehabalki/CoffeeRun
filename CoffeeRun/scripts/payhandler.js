(function(window) {
  "use strict";

  var App = window.App || {};
  var $ = window.jQuery;

  function PayHandler(selector) {

    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  PayHandler.prototype.addSubmitHandler = function() {
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var title = $("input[name='title']:checked").val();
      var name = $(".name").val();

      if (title != undefined && name != undefined) {
        var description = title + name + ".";
        $(".thank").append(description);
      }
      $(".modal").css("display", "block");

      $(document).ready(function() {
        $(".close").click(function() {
          $(".modal").css("display", "none");
          $(".thank").text("Thank you for your payment ");
          window.location.href = "index.html";
        });
      });

      $(window).click(function() {
        $(".modal").css("display", "none");
        $(".thank").text("Thank you for your payment ");
        window.location.href = "index.html";
      });
    });
  };

  PayHandler.prototype.addInputHandler = function(fn) {
    this.$formElement.on("input", "[name=\"expiration\"]", function(event) {
      var expiration = event.target.value;
      var message = "";
      var value = fn(expiration);
      if (value === true) {
        event.target.setCustomValidity("");
      } else {
        message = value;
        event.target.setCustomValidity(message);
      }
    });
  };

  App.PayHandler = PayHandler;
  window.App = App;

})(window);
