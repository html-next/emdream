var faker = require('faker');
var props = require('json-api-mock-server/lib/store/props');
var between = require('json-api-mock-server/lib/utils/between');
var attr = props.attr;
var many = props.many;
var one = props.one;

module.exports = {
  name: attr('string', { defaultValue: function() { return faker.lorem.words(between(3, 7)); }})
};
