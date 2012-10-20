App.TabSelectView = Ember.Select.extend({
  content: [Ember.Object.create({
    name: 'Controller',
    value: 'controller'
  }), Ember.Object.create({
    name: 'Template',
    value: 'template'
  })],

  optionValuePath: 'content.value',
  optionLabelPath: 'content.name'
});
