var faker = require('faker');
var props = require('../store/props');
var attr = props.attr;
var one = props.one;
var between = require('../utils/between');

module.exports = {
  title: attr('string', { defaultValue: function() { return faker.lorem.words(between(3, 5)); }}),
  body: attr('string', { defaultValue: function() { return faker.lorem.sentences(between(3, 8)); }}),
  recipient: one('user', { inverse: 'emails' }),
  sender: one('contact', { inverse: 'emails', defaultValue: true })
};
