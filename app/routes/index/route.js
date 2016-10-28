import Ember from 'ember';

const {
  inject,
  Route
} = Ember;

export default Route.extend({
  session: inject.service('session'),

  redirect() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('login');
    } else {
      this.transitionTo('email');
    }
  }
});
