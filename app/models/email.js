import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  title: attr('string'),
  body: attr('string'),
  recipient: belongsTo('user', { inverse: 'emails' }),
  sender: belongsTo('contact', { inverse: 'emails' })
});
