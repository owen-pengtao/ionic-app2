angular.module('starter.services', [])
/**
 * A simple example service that returns some data.
 */
.factory('Settings', function() {
  var settings = {
    "rate" : 6.28,
    "tax"  : 8.75
  };
  return settings;
})
.factory('Duty', function() {
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
