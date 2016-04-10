export function initialize(appInstance) {
  const controller = appInstance.lookup('cerebral:main');

  controller.addServices({
    // ajax: Ember.$.ajax
  });
}

export default {
  name: 'cerebral',
  initialize
};
