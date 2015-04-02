function round2(number, fractionDigits){
  return Math.round(number*Math.pow(10,fractionDigits))/Math.pow(10,fractionDigits);
}
angular.module('starter.controllers', ['starter.services'])

  .controller('HomeCtrl', function ($scope, $localstorage, Settings) {
    "use strict";
    $scope.settings  = Settings;

    $scope.goods = {
      tagPrice    : 40,
      couponStore : 0,
      couponMoney : 0,
      couponOff   : 0,

      expressDuty : 0,
      expressUS   : 0,
      expressCN   : 0,
      expressOther: 0
    };
    $scope.coupon = {
      store : 0,
      money : 0,
      off   : 0
    };

    $scope.calculatePrice = function() {
      $scope.coupon.store = round2($scope.goods.tagPrice * $scope.goods.couponStore/100, 2);

      if ($scope.goods.couponOff) {
        $scope.coupon.off = round2(($scope.goods.tagPrice - $scope.coupon.store) * $scope.goods.couponOff / 100, 2);
      }
      if ($scope.goods.couponMoney) {
        $scope.coupon.money = Math.abs($scope.goods.couponMoney);
      }
      $scope.goods.couponCount = $scope.coupon.store + $scope.coupon.off + $scope.coupon.money;

      $scope.goods.purchasePrice = round2(($scope.goods.tagPrice - $scope.goods.couponCount) * (1 + $scope.settings.tax/100), 2);
      return $scope.goods.purchasePrice;
    };

    $scope.calculatePrice();
    $scope.resetPrice = function() {
      $scope.goods = {};
    };
    $scope.onTabSelected = function() {
      console.log("onTabSelected");
    };
  })

  .controller('CardsCtrl', function ($scope, Cards, $state) {
    $scope.cards = Cards.all();
    $scope.remove = function (card) {
      Cards.remove(card);
    };
    $scope.onTabSelected = function(){
      $state.go("tab.cards");
    };
  })

  .controller('CardDetailCtrl', function ($scope, $stateParams, User, Cards, $state, $ionicNavBarDelegate) {

  })

  .controller('PricesCtrl', function ($scope, Settings) {
    "use strict";
    $scope.settings  = Settings;
    $scope.tagPrice = {
      low  : 5,
      high : 100,
      step : 5,
      off  : 20
    };
    $scope.prices = [];

      $scope.calculatePrice = function () {
      var prices = [];
      for (var i = $scope.tagPrice.low; i <= $scope.tagPrice.high; i = i + $scope.tagPrice.step) {
        prices.push(i);
      }
      $scope.prices = prices;
    };
    $scope.calculatePrice();
    $scope.onTapRow = function($event){
      $event.currentTarget.className = $event.currentTarget.className ? "" : "selected";
    };
  })

  .controller('SettingsCtrl', function ($scope, Settings, Duty, $localstorage) {
    $scope.settings = Settings;
    $scope.duty = Duty;
    $scope.saveSetting = function(){
      $localstorage.setObject("settings", $scope.settings);
    };
  });
