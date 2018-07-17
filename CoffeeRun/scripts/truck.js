(function(window) {
  "use strict";
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function(order) {
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function(customerId, orderList) {
    var b = "";
    for (b in orderList) {
      if (orderList[b] === customerId) {
        orderList.splice(b, 1);
        break;
      }
    }
    this.db.remove(customerId);
  };

  Truck.prototype.updateOrder = function(order) {
    this.db.update(order.emailAddress, order);
  };

  Truck.prototype.getAllOrder = function(order) {
    this.db.getAll((function(serverResponse) {
      var id;
      var that = this.db;
      serverResponse.forEach(function(item) {
        id = item.id;
        that.get(id, function(singleOrder) {
          order(singleOrder);
        });
      });
    }).bind(this));
  };

  Truck.prototype.printOrders = function() {
    this.db.getAll((function(serverResponse) {
      var id;
      var that = this.db;
      serverResponse.forEach(function(item) {
        id = item.id;
        that.get(id, function(singleOrder) {
          console.log(singleOrder); // eslint-disable-line
        });
      });
    }).bind(this));
  };

  App.Truck = Truck;
  window.App = App;

})(window);
