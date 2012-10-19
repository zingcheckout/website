App.TabView = Ember.View.extend({
  classNameBindings: ['hidden'],

  currentTabBinding: 'context.currentTab',

  hidden: function() {
    if (this.get('currentTab') === this.get('name')) {
      return false;
    }

    return true;
  }.property('currentTab')
});
