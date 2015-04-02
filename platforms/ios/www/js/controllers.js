function round2(number, fractionDigits){
  return Math.round(number*Math.pow(10,fractionDigits))/Math.pow(10,fractionDigits);
}
angular.module('starter.controllers', ['starter.services'])

  .controller('HomeCtrl', function ($scope, $localstorage, Settings) {
    "use strict";
    $scope.settings  = Settings;

    $scope.goods = {
      tagPrice    : 279,
      couponStore : 50,
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
      if ($scope.goods.couponStore) {
        $scope.coupon.store = $scope.goods.tagPrice * (1 - $scope.goods.couponStore/100);
      }
      if ($scope.goods.couponMoney) {
        $scope.coupon.money = Math.abs($scope.goods.couponMoney);
      }
      if ($scope.goods.couponOff) {
        $scope.coupon.off = round2($scope.goods.tagPrice * $scope.goods.couponOff / 100, 2);
      }
      $scope.goods.couponCount = $scope.coupon.store + $scope.coupon.money + $scope.coupon.off;

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

  .controller('MyCardsCtrl', function ($scope, MyCards) {
    $scope.myCards = MyCards.all();
  })

  .controller('MyCardDetailCtrl', function ($scope, $stateParams, MyCards) {
    $scope.myCard = MyCards.get($stateParams.myCardId);
  })

  .controller('SettingsCtrl', function ($scope, Settings, Duty, $localstorage) {
    $scope.settings = Settings;
    $scope.duty = Duty;
    $scope.saveSetting = function(){
      $localstorage.setObject("settings", $scope.settings);
    };
  });
