# Ember Cerebral

Enhanced state management for complex Ember apps using [Cerebral](http://www.cerebraljs.com/).

Why?
-------------

If you've had success with Ember's [data down, actions up pattern](http://www.samselikoff.com/blog/data-down-actions-up/), think of Cerebral as turning that pattern up to [11](https://en.wikipedia.org/wiki/Up_to_eleven). In cerebral, all state lives in one central state store and flows in one direction from the top of your component tree to the bottom. Additionally, state changes do not happen by mutating models or component props via two way bindings. They are externalized to chains of functions, called [signals](http://www.cerebraljs.com/signals), that may also perform asynchronous requests (ajax, etc).

Isolating state, updating it with small, simple functions, and embracing one way dataflow improves your ability to reason about your application as it scales in size and complexity, especially with tools like the Cerebal [debugger](https://www.youtube.com/watch?v=ZMXcSRiq6fU).

In short, Ember Cerebral brings the best of the Flux/React and Ember communities together into one package.

Installation
--------------
- `npm install ember-cerebral --save`

- `ember g ember-cerebral ember-cerebral`

 Creates an initializer at:`app/initializers/cerebral`. This initializer imports cerebral packages from npm and injects Cerebral into your app components and routes.

- `ember g services cerebral`

  The `services` generator will generate an instance initializer, giving you access to the cerebral controller so you can inject services (ajax, ember-data, etc) into Cerebral.

- `npm install ember-browserify --save-dev` - necessary for loading npm packages

- `npm install cerebral cerebral-model-baobab --save`
- `cerebral-module-devtools --save-dev`

Usage
--------

Check out the example [TodoMVC app](https://github.com/bfitch/ember-cerebral-todomvc).

Expose Cerebral state to your component using the `CerebralMixin` and define a `cerebralProps()` method mapping component properties to their location in the cerebral store:

```js
// in component x-foo.js

import CerebralMixin from 'ember-cerebral/mixins/cerebral-mixin';

export default Ember.Component.extend(CerebralMixin, {
  cerebralProps() {
    userName: 'path.to.cerebral.userName'
  }
});
```

State is available as props on the component (and routes):

```js
// in component foo.js

excitedUserName: Ember.computed('userName', function() {
  return `${this.get('userName')}!!!!!!`;`
})
```

Trigger signals to change state:
```js
actions: {
  buttonClicked() {
    this.get('signals').buttonClicked();
  }
}
```

Thanks
----------
Thanks to Toran Billups (@toranb) who's [screencast](https://vimeo.com/160234990) on [ember-redux](https://github.com/toranb/ember-redux) inspired this integration.


-----------------
For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
