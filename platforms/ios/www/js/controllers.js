function round2(number, fractionDigits){
  return Math.round(number*Math.pow(10,fractionDigits))/Math.pow(10,fractionDigits);
}
angular.module('starter.controllers', ['starter.services'])

  .controller('HomeCtrl', function ($scope, $localstorage, Settings) {
    "use strict";
    $scope.settings  = Settings;

    $scope.tagPrice = {
      low  : 5,
      high : 100,
      step : 5,
      offStore  : 20,
      offCoupon : 10,
      offMoney  : 0
    };
    $scope.prices = [];
    if (Object.keys($localstorage.getObject("prices")).length) {
      $scope.tagPrice = $localstorage.getObject("prices");
    }

    $scope.calculatePrice = function () {
      var prices = [], step = $scope.tagPrice.step || 1;
      if ($scope.tagPrice.low < $scope.tagPrice.high) {
        for (var i = $scope.tagPrice.low; i <= $scope.tagPrice.high; i = i + step) {
          prices.push(i);
        }
        if (prices[prices.length - 1] < $scope.tagPrice.high) {
          prices.push($scope.tagPrice.high);
        }
        $scope.prices = prices;
        $localstorage.setObject("prices", $scope.tagPrice);
      }
    };
    $scope.calculatePrice();
    $scope.onTapRow = function($event){
      if ($event.currentTarget.classList.contains("selected")) {
        $event.currentTarget.classList.remove("selected");
      }else{
        $event.currentTarget.classList.add("selected");
      }
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

  .controller('PriceAddCtrl', function ($scope, Settings, $localstorage) {
    "use strict";
    $scope.settings  = Settings;
    $scope.goods = {
      name        : "",
      tagPrice    : 40,
      couponStore : 0,
      couponMoney : 0,
      couponOff   : 0,
      couponCount : 0,
      purchasePrice : 0,

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
    if (Object.keys($localstorage.getObject("currentPrice")).length) {
      $scope.goods = $localstorage.getObject("currentPrice");
    }

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
      $localstorage.setObject("currentPrice", $scope.goods);
      return $scope.goods.purchasePrice;
    };

    $scope.savePrice = function() {
      var priceHistory = Object.keys($localstorage.getObject("priceHistory")).length ? $localstorage.getObject("priceHistory") : [];
      if (priceHistory!==[] && JSON.stringify(priceHistory.slice(-1)[0]) !== JSON.stringify($scope.goods)) {
        priceHistory.push($scope.goods);
        $localstorage.setObject("priceHistory", priceHistory);
      }
    };
    $scope.onTabSelected = function() {
      console.log("onTabSelected");
    };
    $scope.calculatePrice();
  })

  .controller('PricesCtrl', function ($scope, Settings, $localstorage) {
    "use strict";
    $scope.settings  = Settings;
    $scope.prices = $localstorage.getObject("priceHistory");
    $scope.remove = function(price) {
      $scope.prices.splice($scope.prices.indexOf(price), 1);
      $localstorage.setObject("priceHistory", $scope.prices);
    };
  })
  .controller('SettingsCtrl', function ($scope, Settings, Duty, $localstorage) {
    $scope.settings = Settings;
    $scope.duty = Duty;
    $scope.saveSetting = function(){
      $localstorage.setObject("settings", $scope.settings);
    };
  });
