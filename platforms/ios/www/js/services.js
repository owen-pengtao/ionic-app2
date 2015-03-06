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
    "tax" : "10%"
  }, {
    "category" : "衣服、电子设备、家电、自行车",
    "tax" : "20%"
  }, {
    "category" : "体育用品、表、钟",
    "tax" : "30%"
  }, {
    "category" : "化妆品、烟、酒",
    "tax" : "50%"
  }];
  return duties;
});
