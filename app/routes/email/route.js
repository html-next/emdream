import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    category: {
      refreshModel: true
    }
  },
  model() {
    return this.get('store').query('email', { included: 'contact' });
  }
});
