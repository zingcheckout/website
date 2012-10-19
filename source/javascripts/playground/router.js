App.Router = Ember.Router.extend({
  states: {
    root: Ember.Route.extend({
      showController: function(router) {
        router.set('applicationController.currentTab', 'controller');
      },

      showTemplate: function(router) {
        router.set('applicationController.currentTab', 'template');
      }
    })
  }
});
