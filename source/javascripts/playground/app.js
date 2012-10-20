//= require playground/lib/jquery-1.8.2.min
//= require playground/lib/handlebars-1.0.rc.1
//= require playground/lib/ember
//= require playground/lib/codemirror/codemirror
//= require playground/lib/codemirror/modes/css/css
//= require playground/lib/codemirror/modes/javascript/javascript
//= require playground/lib/codemirror/modes/xml/xml
//= require playground/lib/codemirror/modes/htmlmixed/htmlmixed
//
//= require_self
//
//= require_tree ./views
//= require_tree ./data
//= require_tree ./controllers
//= require ./router

window.App = Ember.Application.create({
  rootElement: '#content'
});
