var faker = require('faker');
var props = require('json-api-mock-server/lib/store/props');
var between = require('json-api-mock-server/lib/utils/between');
var attr = props.attr;
var many = props.many;
var one = props.one;

module.exports = {
  firstName: attr('string', { defaultValue: function() { return faker.name.firstName(); }}),
  lastName: attr('string', { defaultValue: function() { return faker.name.lastName(); }}),
  email: attr('string', { defaultValue: function() { return faker.internet.email(); }}),
  username: attr('string', { defaultValue: function() { return faker.internet.userName(); }}),
  emails: many('email', { defaultValue: function() { return 25; } }),
  contacts: many('contact', { defaultValue: function() { return 25; }})
};
