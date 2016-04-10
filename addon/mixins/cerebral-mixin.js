import Ember from 'ember';
const {computed} = Ember;
const $ = Ember.$;

export default Ember.Mixin.create({
  init() {
    this.bindProps(this.cerebralProps(), this.get('cerebral'));
    this.subscribePropsToCerebralUpdates(this.cerebralProps());

    this._super(...arguments);
  },

  bindProps(cerebralProps, cerebral) {
    $.each(cerebralProps, (prop, path) => {
      this.set(prop, computed(() => {
          return cerebral.get(path)
        }).readOnly()
      );
    });
  },

  subscribePropsToCerebralUpdates(cerebralProps) {
    this.cerebralConnection('on', cerebralProps);
  },

  unsubscribePropsToCerebralUpdates(cerebralProps) {
    this.cerebralConnection('off', cerebralProps);
  },

  cerebralConnection(method, cerebralProps) {
    _.each(this.cursorsByProp(cerebralProps), (cursor,prop) => {
      cursor[method].call(cursor, 'update', this.broadcastProptertyChanged(prop));
    });
  },

  cursorsByProp(cerebralProps) {
    return _.reduce(cerebralProps, (memo, prop, path) => {
      memo[prop] = this.get('cerebral').baobab.select(path);
      return memo;
    }, {});
  },

  broadcastProptertyChanged(prop) {
    return function() {
      this.notifyPropertyChange(prop);
    }.bind(this);
  },

  didDestroyElement() {
    this.unsubscribePropsToCerebralUpdates(this.cerebralProps());
  },

  cerebralProps() {
    throw new Error(
      'You must define a cerebralProps() method to extract' +
      ' properties from the Cerebral state tree.'
    );
  }
});
