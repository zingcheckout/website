App.ApplicationController = Ember.Controller.extend({
  inputDidChange: function() {
    var input = this.get('input');

    var template;
    var outputView = Ember.View.create();
    this.set('error', null);

    try {
      template = Ember.Handlebars.compile(input);
      outputView.set('template', template);
      Ember.run(function() {
        outputView.createElement();
      });

      var iframe = $('#playground-iframe')[0].contentDocument.body;
      $(iframe).empty().append(outputView.$());
    } catch (e) {
      var error = e.message;
      error = error.replace(/\n/g, '<br>');
      this.set('error', error);
    }
  }.observes('input'),

  currentTab: 'controller'
});
