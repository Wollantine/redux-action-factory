import inspector from 'schema-inspector';
import configSchema from './configSchema.json';
import Action from './Action';

export default class ActionFactory {

    _validateConf(conf) {
        // console.log(conf);
        inspector.sanitize(configSchema.sanitization, conf);
        // console.log(conf);
        let result = inspector.validate(configSchema.validation, conf);
        if (!result.valid) {
            throw new Error(result.format());
        }
        return conf;
    }

    constructor(conf) {
        conf = this._validateConf(conf);
        this.conf = conf;
    }

    getConfig() {
        return this.conf;
    }

    _getActionCreator(actionSpecs) {
        let creator = false;
        const creatorName = actionSpecs.creator;

        if (typeof creatorName != 'undefined') {
            creator = this.conf.actionCreators[creatorName];
            if (typeof creator == 'undefined') {
                throw new Error('Creator '+creatorName+' has not been defined for action '+actionSpecs.type+'. Check the parameter "actionCreators" in the initialization config.')
            }
        }

        return creator;
    }

    _createAction(actionName, actionData) {
        if (typeof this.conf.actions[actionName] == 'undefined') {
            throw new Error('Action '+actionName+' has not been defined');
        }
        const specs = this.conf.actions[actionName];
        const actionCreator = this._getActionCreator(specs);

        let action;
        if (actionCreator) {
            action = new Action(specs, actionData, actionCreator, this.conf.inject);
        }
        else {
            action = new Action(specs, actionData, undefined, this.conf.inject);
        }

        return action;
    }

    createAction(actionName, actionData) {
        const action = this._createAction(actionName, actionData);
        return action.getDispatchable();
    }

    createRawAction(actionName, actionData) {
        const action = this._createAction(actionName, actionData);
        return action.rawAction();
    }
}
