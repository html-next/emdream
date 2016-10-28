import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('simple');
  this.route('login');
  this.route('email', function() {
    this.route('single', { path: ':id' });
    this.route('compose');
  });
});

export default Router;
