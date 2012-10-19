App.Panels = Ember.View.extend({
  classNames: ['panels'],

  didInsertElement: function() {
    this.updateChildren();
    var self = this;
    $(window).on('resize', function() {
      self.updateChildren();
    });
  },

  updateChildren: function() {
    var width = this.$().width();
    var childViews = this.get('childViews');

    var leftPanel = childViews.objectAt(0);
    var resizer = childViews.objectAt(1);
    var rightPanel = childViews.objectAt(2);

    var resizerPos = resizer.get('resizerPos') || Math.round(width/2);
    resizerPos = Math.max(100, resizerPos);
    resizerPos = Math.min(resizerPos, width-100);

    leftPanel.set('left', 0);
    leftPanel.set('width', resizerPos);

    resizer.set('left', resizerPos);
    resizer.set('resizerPos', resizerPos);

    rightPanel.set('left', resizerPos+10);
    rightPanel.set('width', width-resizerPos-10);
  }
});

App.Panel = Ember.View.extend({
  attributeBindings: ['style'],
  classNames: ['panel'],

  style: function() {
    var width = this.get('width'),
        left = this.get('left');

    return "width: %@px; left: %@px".fmt(width, left);
  }.property('width')
});

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
