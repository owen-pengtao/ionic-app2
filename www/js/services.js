angular.module('starter.services', [])

.factory('User', function($http, $q) {
    var user = {
      id : 0,
      name : ""
    };
    return {
      login: function() {
        var deferred = $q.defer();
        var data = {
          "id"  : 10204913340487808,
          "name": "Peng Tao"
        };
        deferred.resolve(data);
        return deferred.promise;
      },
      login2: function() {
        var deferred = $q.defer();
        $http.get("http://i.ypages.com/api.php?m=api_user&a=login&phone_no=15889457465&password=99988811&login_type=1")
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (e, status) {
            deferred.reject(e, status);
          });
        return deferred.promise;
      },
      set : function(me) {
        user = me;
        return user;
      },
      get : function() {
        return user;
      },
      isLogin : function() {
        console.log(user);
        return user.id ? true : false;
      }
    };
})
.factory('Cards', function($http, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cards = [{
    id: 1,
    bank: 'Chase'
  }, {
    id: 2,
    bank: 'Amex(Membership Rewards)'
  }, {
    id: 3,
    bank: 'Capital One(Credit Cards)'
  }, {
    id: 4,
    bank: 'Citibank(Thank You Rewards)'
  }, {
    id: 5,
    bank: 'Barclaycard'
  }, {
    id: 6,
    bank: 'Discover Rewards'
  }];

  return {
    all: function() {
      return cards;
    },
    remove: function(card) {
        cards.splice(cards.indexOf(card), 1);
    },
    get: function(cardId) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].id === parseInt(cardId)) {
          return cards[i];
        }
      }
      return null;
    },
    add: function(card) {
      var deferred = $q.defer();
      $http.get("http://i.ypages.com/api.php?m=api_feedback&a=submitFeedback&content=I_Love_It"+ (new Date()) +"&contact=13800138000&uid=1&username=Itotem")
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (e, status) {
          deferred.reject(e, status);
        });
      console.log(card);
      return deferred.promise;
    }
  };
})

/**
 * A simple example service that returns some data.
 */
.factory('MyCards', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var myCards = [{
    id: 1,
    aliasName   : "Chase Freedom",
    bankID      : 1,
    bankName    : "Chase",
    cardType    : "Credit",
    validDate   : "08/2019",
    point       : "2000",
    creditLimit : "5000",
    createTime  : "02/07/2015"
  }, {
    id: 2,
    aliasName   : "AMEX Costco",
    bankID      : 2,
    bankName    : "American Express",
    cardType    : "Credit",
    validDate   : "08/2017",
    point       : "3000",
    creditLimit : "2000",
    createTime  : "02/06/2015"
  }];


  return {
    all: function() {
      return myCards;
    },
    get: function(myCardId) {
      // Simple index lookup
      return myCards[myCardId-1];
    }
  };
});
