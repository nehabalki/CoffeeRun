(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse); // eslint-disable-line
    });
  };

  RemoteDataStore.prototype.update = function(key, val) {
    this.getAll((function(serverResponse) {
      var id;
      serverResponse.forEach(function(item) {
        if (item.emailAddress == key) {
          id = item.id;
        }
      });
      $.ajax(this.serverUrl + "/" + id, {
        type: "PUT",
        data: val
      });
    }).bind(this));
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    this.getAll((function(serverResponse) {
      var id;
      serverResponse.forEach(function(item) {
        if (item.emailAddress == key) {
          id = item.id;
        }
      });
      $.ajax(this.serverUrl + "/" + id, {
        type: "DELETE"
      });
    }).bind(this));
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + "/" + key, function(serverResponse) {
      cb(serverResponse);
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
