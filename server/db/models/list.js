var faker = require('faker');
var props = require('../store/props');
var attr = props.attr;
var many = props.many;
var one = props.one;
var between = require('../utils/between');

module.exports = {
  name: attr('string', { defaultValue: function() { return faker.lorem.words(between(3, 7)); }})
};
