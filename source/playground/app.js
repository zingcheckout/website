window.App = Ember.Application.create({
  rootElement: '#content'
});

$(function() {

var appController = Ember.Controller.create({
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
      this.set('error', e.message);
    }

  }.observes('input')
});

var appView = Ember.View.create({
  controller: appController,
  templateName: "app"
});
appView.appendTo('#input');

App.appController = appController;
});
