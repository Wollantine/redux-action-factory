var createAction = require('../../lib/index').default.createAction;
var type = require('../../lib/index').default.type;

// Quick mock of Redux + redux-thunk's dispatch
var dispatch = function (action) {
    if (typeof action == 'function') {
        action(dispatch);
    }
    else {
        var msg = 'Dispatched ';

        if (action.type == type('ACTION1')) msg += 'First';
        else if (action.type == type('ACTION2')) msg += 'Second';

        console.log(msg+' Action: '+JSON.stringify(action));
    }
};



var action = createAction('ACTION1', {a: '42', b: false});
dispatch(action);

action = createAction('ACTION2', {c: 'Oh, hi!'}); // Returns (dispatch) => {...}
dispatch(action);
