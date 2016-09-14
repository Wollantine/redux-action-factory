# Redux Action Factory
Simple library for creating schema-validated Redux Actions (or thunks, promises, etc.). Powered by the awesomely awesome [Schema-Inspector](http://atinux.github.io/schema-inspector/).

## Installation
```
npm install redux-action-factory --save
```

## Motivation
In big projects, many action types have to be managed, each one with its Action Creator (sometimes a thunk that will dispatch other actions and perform side-effects), and that generates a large number of files, complexity, and makes the project harder to maintain in general.

With Redux Action Factory, good maintenance is achieved by:

- Centralizing the Actions' specification in a file.
- Ensuring robustness in the action creation process by checking arguments' types.
- Eliminating the need for synchronous actions' Action Creators.
- Providing a common interface and place for all complex Action Creators (asynchronous action creators, thunks, etc.).

Furthermore, it has been designed with Unit Testing in mind.

## Usage
#### Initialize the factory
In your index.js you should put something similar to:

index.js:
```js
var initialize = require('redux-action-factory').initialize;
var actionsSpecification = require('./actions.json');

initialize({
    actions: actionsSpecification,
    actionCreators: [...],  // optional
    inject: [...]           // optional
});
```

**Note**: It has been made to support ES6 imports:
```js
import {initialize} from 'redux-action-factory';
```

#### Create a specification file for your actions
Example of actions.json:
```json
{
    "ACTION_NAME": {
        "type": "myProject/ACTION",
        "args": {
            "type": "object",
            "strict": true,
            "properties": {
                "actionParam1": {"type": "number"},
                "actionParam2": {"type": "string", "optional": true}
            }
        }
    }
}
```

#### Use it to create actions
Somewhere in your app:
```js
var createAction = require('redux-action-factory').createAction;

dispatch(createAction('ACTION_NAME', {actionParam1: 42, actionParam2: 'Other data'}));
```

#### And finally, a little change in the reducers
In your reducers, instead of:
```js
case 'ACTION_NAME':
```

Just do:
```js
var type = require('redux-action-factory').type;

[...]
case type('ACTION_NAME'):
```

#### Testing
When testing, if you need to check if the proper action was created but you don't want to trigger any side effects or execute any Action Creator code, you can use the `createRawAction` method as follows:
```js
var createRawAction = require('redux-action-factory').createRawAction;

// This won't execute the Action Creator function
createRawAction('ACTION_NAME', {actionParam1: 42, actionParam2: 'Other data'});
```

Also, if you need to test the correctness of your `actions.json` file(s), you can use the exported objects `actionsSanitizationSchema` and `actionsValidationSchema` like this:
```js
var sanitization = require('redux-action-factory').actionsSanitizationSchema;
var validation = require('redux-action-factory').actionsValidationSchema;
var inspector = require('schema-inspector'); // Schema-Inspector should be installed in your project
var actions = require('./actions.json');
var assert = require('chai').assert;

describe('Actions Schema', function () {
  it('should be a valid schema', function () {
    inspector.sanitize(sanitization, actions);
    var result = inspector.validate(validation, actions);
    assert.ok(result.valid, result.format());
  });
});
```

## API
### initialize
```js
initialize(configuration)
```
Creates and initializes the Action Factory every time it is called. Only the last call will be taken into account.
- **`configuration`**: The configuration object for the factory. It allows the following properties:
    - **`actions`**: An actions specification object. Check [Actions API](#actions) for more details.
    - **`actionCreators`(optional)**: A map of Action Creators names and functions. These functions should return dispatchable objects in your Redux system. A good practice is to define each of them in a separate file inside a specific folder, and then require them all with a glob require library ([babel-plugin-import-glob](https://github.com/novemberborn/babel-plugin-import-glob), [node-glob](https://github.com/isaacs/node-glob), etc.).
    - **`inject`(optional)**: An additional parameter that will be injected as a second parameter into every Action Creator call. Any type allowed, also objects that can contain whatever fits you. Useful for passing interfaces for actions side-effects (like APIs interfaces) into every action creator.

### Actions
```js
{
    "ACTION": {
        "type": {string}
        "args": {object}
        "sanitize": {object} //optional
        "creator": {string} //optional
    }
}
```
- **`type`**: A unique string that shall be used to identify the Action in the reducers and across systems (recommended to be namespaced).
- **`args`**: A valid [Schema-Inspector](https://www.npmjs.com/package/schema-inspector)'s validation schema to run against the parameters passed in `createAction`.
- **`sanitize`(optional)**: A valid [Schema-Inspector](https://www.npmjs.com/package/schema-inspector)'s sanitization schema to run against the parameters passed in `createAction`.
- **`creator`(optional)**: The name of an Action Creator provided in the initial configuration.

### getConfig
```js
getConfig()
```
Returns the config passed in the last call to `initialize`.

### createAction
```js
createAction(actionName, params)
```
If actionName and params are compliant with the configuration's actions specification, creates and returns a dispatchable action. Otherwise, throws an Error with human readable details on the failure.
- **`actionName`**: The Action's name in the specification.
- **`params`(optional)**: The Action's data.

If no Action Creator was defined for that action, returns the raw action, an object such as:
```js
{
    type: configuration.actions[actionName].type,
    ...params
}
```

Otherwise, executes the provided action creator with the raw action as a first parameter and the injected parameter as second.
```js
actionCreator(rawAction, configuration.inject)
```

### createRawAction
```js
createRawAction(actionName, params)
```
Same as `createAction`, but it always returns the raw action object without calling the actionCreator (if there was one).

### actionsValidationSchema
```js
actionsValidationSchema
```
The schema against which the `configuration.actions` object will be validated after being sanitized.
Useful for validating `actions.json` correctness at testing time.

### actionsSanitizationSchema
```js
actionsSanitizationSchema
```
The schema by which the `configuration.actions` object will be sanitized before validation.
Useful for validating `actions.json` correctness at testing time.

## Thanks and contributing
Thanks to the boilerplate's authors Travelport-Ukraine for [npm-module-boilerplate-es6](https://github.com/Travelport-Ukraine/npm-module-boilerplate).

If you have an idea on how to improve this library, I listen to suggestions here in the [issues channel](https://github.com/kwirke/redux-action-factory/issues).
