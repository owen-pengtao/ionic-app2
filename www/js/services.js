angular.module('starter.services', [])
.factory('Rate', function($http, $q) {
    var deferred = $q.defer(), obj = {};
    obj.getRate = function () {
      $http.get('http://api.k780.com:88/?app=finance.rate&scur=USD&tcur=CNY&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json')
        .success(function(data) {
          deferred.resolve(data.result);
        })
        .error(function (e, status) {
          deferred.reject(e, status);
        });
        return deferred.promise;
    };
    return obj;
})
.factory('Settings', function($localstorage) {
  "use strict";
  var settings = {
    "rate" : 6.28,
    "tax"  : 8.75,
    "duty" : 0.1,
    "toggleCost" : false
  };
  if (Object.keys($localstorage.getObject("settings")).length) {
    settings = $localstorage.getObject("settings");
  }else{
    $localstorage.setObject("settings", settings);
  }
  return settings;
})
.factory('Duty', function() {
  "use strict";
  var duties = [{
    "category" : "箱包、鞋、配饰、食品、保健品、玩具、乐器、文具用品、其他",
    "tax" : "0.1"
  }, {
    "category" : "衣服、电子设备、家电、自行车",
    "tax" : "0.2"
  }, {
    "category" : "体育用品、表、钟",
    "tax" : "0.3"
  }, {
    "category" : "化妆品、烟、酒",
    "tax" : "0.5"
  }];
  return duties;
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
}]);
