(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-order=\"form\"]";
  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  var SERVER_URL = "http://localhost:2403/coffeeorders";
  var App = window.App;
  var Truck = App.Truck;
  /*var DataStore = App.DataStore;*/
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var orderList = [];
  /*var myTruck = new Truck("ncc-1701", new DataStore());*/
  var myTruck = new Truck("ncc-1701", remoteDS);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck),orderList);
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
    if (orderList.includes(data.emailAddress)) {
      myTruck.updateOrder.call(myTruck, data);
      checkList.addRow.call(checkList, data);
    } else {
      myTruck.createOrder.call(myTruck, data);
      checkList.addRow.call(checkList, data);
      setTimeout(function() {
        window.location.href = "payment.html";
      }, 2000);
    }
  });

  myTruck.getAllOrder.call(myTruck, function(order) {
    checkList.addRow.call(checkList, order);
    orderList.push(order.emailAddress);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);
