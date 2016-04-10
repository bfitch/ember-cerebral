# Ember Cerebral

Enhanced state management for complex Ember apps using [Cerebral](http://www.cerebraljs.com/).

Installation
--------------
- `ember install ember-cerebral`

- `ember g services cerebral`

  At installation, a default generator will run, creating an initializer at:
`app/initializers/cerebral`. This initializer `import`s cerebral packages
from npm and injects Cerebral into your app components and routes.

  The `services` generator will generate an instance initializer, giving you access to
the cerebral controller so you can inject services (ajax, ember-data, etc) into Cerebral.

- `npm install ember-browserify --save-dev` - necessary for loading npm packages

- `npm install cerebral cerebral-model-baobab cerebral-module-devtools --save`

Usage
--------

Check out the example [TodoMVC app HERE!](https://github.com/bfitch/ember-cerebral-todomvc)

Expose Cerebral state to your component using the `CerebralMixin`:

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
