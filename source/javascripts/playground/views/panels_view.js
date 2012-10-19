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
