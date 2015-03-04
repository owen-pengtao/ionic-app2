angular.module('starter.controllers', ['starter.services'])

  .controller('HomeCtrl', function ($scope, User) {
    "use strict";
    $scope.isLogin = false;

    $scope.doLogin = function () {
      User.login().then(function(data){
        $scope.isLogin = true;
        var _user = {
          id : data.id,
          name: data.name
        };
        $scope.user    = _user;
        User.set(_user);
      });
    };
    $scope.fbLogin = function () {
      openFB.login(
        function (response) {
          if (response.status === 'connected') {
            console.log('Facebook login succeeded');
            $scope.isLogin = true;
            $scope.getMe();
          } else {
            alert('Facebook login failed');
          }
        },
        {scope: 'email,publish_actions'});
    };
    $scope.fbLogout = function () {
      openFB.logout(
        function () {
          $scope.isLogin = false;
        });
    };
    $scope.getMe = function () {
      openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function (user) {
          $scope.isLogin = true;
          $scope.user    = user;
          $scope.$apply(function () {
            User.set(user);
          });
        }
      });
    };
    $scope.getMe();
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

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
