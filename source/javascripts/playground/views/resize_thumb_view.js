App.ResizeThumb = Ember.View.extend({
  attributeBindings: ['style'],
  classNames: ['resizer'],

  style: function() {
    return "left: %@px".fmt(this.get('left'));
  }.property('left'),

  didInsertElement: function() {
    $('<div id="mouse-detector"></div>').appendTo(document.body);
  },

  mouseDown: function(event) {
    var startX = event.clientX;
    var startResizerPos = this.get('resizerPos');

    var self = this;

    var mouseDetector = $('#mouse-detector');

    mouseDetector.addClass('active');
    mouseDetector.on('mousemove', function(event) {
      var dragResizerPos = self.get('dragResizerPos');
      self.set('resizerPos', startResizerPos + (event.clientX - startX));
      self.get('parentView').updateChildren();
    });

    mouseDetector.one('mouseup', function() {
      $(this).off('mousemove').removeClass('active');
    });

    return false;
  }
});
