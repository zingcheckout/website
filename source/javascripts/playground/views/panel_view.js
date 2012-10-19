App.Panel = Ember.View.extend({
  attributeBindings: ['style'],
  classNames: ['panel'],

  style: function() {
    var width = this.get('width'),
        left = this.get('left');

    return "width: %@px; left: %@px".fmt(width, left);
  }.property('width')
});
