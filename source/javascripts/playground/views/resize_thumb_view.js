App.ResizeThumb = Ember.View.extend({
  attributeBindings: ['style'],
  classNames: ['resizer'],

  style: function() {
    return "left: %@px".fmt(this.get('left'));
  }.property('left'),

  mouseDown: function(event) {
    var startX = event.clientX;
    var startResizerPos = this.get('resizerPos');

    var self = this;
    $(document).on('mousemove', function(event) {
      var dragResizerPos = self.get('dragResizerPos');
      self.set('resizerPos', startResizerPos + (event.clientX - startX));
      self.get('parentView').updateChildren();
    });

    $(document).one('mouseup', function() {
      $(this).off('mousemove');
    });

    return false;
  },

  mouseUp: function() {
    $(document).off('mousemove');
  },

  documentMouseMove: function(event) {
    if (this.get('isDragging')) {
    }
  }
});
