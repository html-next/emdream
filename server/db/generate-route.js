/*jshint node:true*/
var bodyParser = require('body-parser');
var pluralize = require('./utils/pluralize');
var chalk = require('chalk');

function colorBGForMethod(method) {
  switch (method) {
    case 'DELETE':
      return 'bgRed';
    case 'PUT':
      return 'bgYellow';
    case 'PATCH':
      return 'bgMagenta';
    case 'POST':
      return 'bgBlue';
    case 'GET':
      return 'bgGreen';
    default:
      return 'bgBlack';
  }
}

function logRequest(req) {
  console.log(
    '\tMock Request\t' +
    chalk[colorBGForMethod(req.method)](chalk.bold(chalk.white(' ' + req.method + ' '))) + ' ' +
      chalk.white(req.baseUrl) +
      chalk.yellow(req._parsedUrl.search)
  );
  // console.log(req);
}


module.exports = function(app, modelName) {
  var express = require('express');
  var router = express.Router();

  router.get('/', function(req, res) {
    logRequest(req, modelName);

    res.send(app.store.query(modelName, req.query));
  });

  router.post('/', function(req, res) {
    logRequest(req, modelName);

    res.status(201).send(
      app.store.createRecord(modelName, req.body));
  });

  router.get('/:id', function(req, res) {
    logRequest(req, modelName);

    res.send(
      app.store.findRecord(modelName, req.params.id, req.query));
  });

  router.put('/:id', function(req, res) {
    logRequest(req, modelName);

    res.send(
      app.store.updateRecord(modelName, req.params.id, req.body));
  });

  router.delete('/:id', function(req, res) {
    logRequest(req, modelName);

    app.store.deleteRecord(modelName, req.params.id);
    res.status(204).end();
  });

  app.use('/api/' + pluralize(modelName), bodyParser.json());
  app.use('/api/' + pluralize(modelName), router);
};
