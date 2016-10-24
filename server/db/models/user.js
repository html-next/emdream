var faker = require('faker');
var props = require('../store/props');
var attr = props.attr;
var many = props.many;
var one = props.one;
var between = require('../utils/between');

module.exports = {
  firstName: attr('string', { defaultValue: function() { return faker.name.firstName(); }}),
  lastName: attr('string', { defaultValue: function() { return faker.name.lastName(); }}),
  email: attr('string', { defaultValue: function() { return faker.internet.email(); }}),
  username: attr('string', { defaultValue: function() { return faker.internet.userName(); }}),
  emails: many('email', { defaultValue: function() { return 1; } }),
  contacts: many('contact', { defaultValue: function() { return 0; }})
};
