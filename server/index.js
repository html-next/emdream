/*jshint node:true*/
var Store = require('./db/store/store');
var route = require('./db/generate-route');

function mountEndpoints(app, config) {
  app.store = new Store(config || {});

  app.store.namespaces.forEach(function(name) {
    route(app, name);
  });
}

module.exports = function(app) {
  mountEndpoints(app);
};




