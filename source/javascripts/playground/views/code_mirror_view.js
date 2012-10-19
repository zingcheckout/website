App.CodeMirrorView = Ember.View.extend({
  didInsertElement: function() {
    var self = this;
    var delay;
    var editor;

    var updateValue = function() {
      self.set('value', editor.getValue());
    }

    editor = new CodeMirror(this.$()[0], {
      mode: 'text/html',
      onChange: function() {
        clearTimeout(delay);
        delay = setTimeout(updateValue, 300);
      }
    });
  }
});
