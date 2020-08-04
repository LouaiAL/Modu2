(function () {
  'use strict';
  
  angular.module('ShoppingListApp', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var itemAdder = this;
  
    itemAdder.itemName = "";
    itemAdder.itemQuantity = "";
  
    itemAdder.addItem = function () {
      ShoppingListCheckOffService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
    }

    // show the items
    itemAdder.toBuy = ShoppingListCheckOffService.getToBuyItem();

    itemAdder.checkOff = function (itemIndex){
      ShoppingListCheckOffService.checkOff(itemIndex)
    };

  }
  
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
  
    boughtList.bought = ShoppingListCheckOffService.getBoughtItem();

  }
  
  function ShoppingListCheckOffService() {
    var service = this;
  
    // List to buy
    var toBuy = [];

    // List bought
    var bought = [];
  
    var item;
    
    service.addItem = function (itemName, quantity) {
      
      item = {
        name: itemName,
        quantity: quantity
      };
      toBuy.push(item);
    };
    
    service.checkOff = function (itemIndex){
      var tempItem = toBuy[itemIndex];
      
      toBuy.splice(itemIndex, 1);
      bought.push(tempItem);
      console.log(toBuy.name);
    }
  
    service.getToBuyItem = function () {
      return toBuy;
    };

    service.getBoughtItem = function (){
      return bought;
    }
  }
  })();
  