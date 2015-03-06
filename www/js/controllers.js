function round2(number,fractionDigits){
  return Math.round(number*Math.pow(10,fractionDigits))/Math.pow(10,fractionDigits);
}
angular.module('starter.controllers', ['starter.services'])

  .controller('HomeCtrl', function ($scope, Settings, Duty) {
      "use strict";
      $scope.settings  = Settings;
      $scope.duty  = Duty;
      $scope.goods = {
        tagPrice    : 279,
        couponStore : 0,
        couponMoney : 0,
        couponOff   : 0
      };
      $scope.coupon = {
        store : 50,
        money : 0,
        off   : 0
      };
      $scope.express = {
        duty  : 0.1,
        us    : 12,
        cn    : 10,
        other : 0
      };
      var offs = [];
      for (var i = 0, sum = 100; i < sum; i = i + 5) {
        offs.push(i);
      }
      $scope.offs = offs;

      $scope.calculatePrice = function() {
        if ($scope.coupon.store) {
          $scope.goods.couponStore = $scope.goods.tagPrice * (1 - $scope.coupon.store/100);
        }

        if ($scope.coupon.money) {
          $scope.goods.couponMoney = Math.abs($scope.coupon.money);
        }
        if ($scope.coupon.off) {
          $scope.goods.couponOff = round2($scope.goods.tagPrice * $scope.coupon.off / 100, 2);
        }
        $scope.goods.coupon = $scope.goods.couponStore + $scope.goods.couponMoney + $scope.goods.couponOff;

        $scope.goods.purchasePrice = round2(($scope.goods.tagPrice - $scope.goods.coupon) * (1 + $scope.settings.tax/100), 2);
        return $scope.goods.purchasePrice;
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
    $scope.card = Cards.get($stateParams.cardId);
    $scope.myCard = {};

    $scope.addCard = function () {
      var _card = {
        "userID"    : User.id,
        "bankID"    : $scope.myCard.bankID,
        "cardType"  : $scope.myCard.cardType,
        "validDate" : $scope.myCard.validDate,
        "point"     : $scope.myCard.point,
        "creditLimit" : $scope.myCard.creditLimit,
        "aliasName" : $scope.myCard.aliasName
      };
      Cards.add(_card).then(function(resData, status){
        debugger;
        $ionicNavBarDelegate.back();
        $state.go("tab.mycards");
      });
    };
  })

  .controller('MyCardsCtrl', function ($scope, MyCards) {
    $scope.myCards = MyCards.all();
  })

  .controller('MyCardDetailCtrl', function ($scope, $stateParams, MyCards) {
    $scope.myCard = MyCards.get($stateParams.myCardId);
  })

  .controller('SettingsCtrl', function ($scope, Settings) {
    $scope.settings = Settings;
  });
