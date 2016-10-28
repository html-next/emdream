/*jshint node:true*/
var mountEndpoints = require('json-api-mock-server');

module.exports = function(app) {
  mountEndpoints(app);
};
