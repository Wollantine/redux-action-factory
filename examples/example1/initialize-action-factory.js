var initializeActionFactory = require('../../lib/index').initialize;
var actionsSchema = require('./actions.json');

initializeActionFactory({
    actions: actionsSchema,
    actionCreators: {
        createAction2: function (rawAction, injected) {
            return function (dispatch) {
                dispatch(rawAction);

                var API = injected.API;
                API.sendData(rawAction.c);
            }
        }
    },
    inject: {
        API: {
            // Fake API stub
            sendData: function (data) {console.log(data)}
        }
    }
});
