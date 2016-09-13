import inspector from 'schema-inspector';

class Action {

    _validateData(specs, data) {
        if (specs.sanitize) {
            inspector.sanitize(specs.sanitize, data);
        }
        let result = inspector.validate(specs.args, data);
        if (!result.valid) {
            throw new Error('Missing or wrong arguments for action '+specs.type+':\n'+result.format());
        }
        return data;
    }

    constructor(actionSpecs, actionData = {}, actionCreator = this._defaultActionCreator, injectedProps = {}) {
        this.data = this._validateData(actionSpecs, actionData);
        this.type = actionSpecs.type;
        this.actionCreator = actionCreator;
        this.injectedProps = injectedProps;
    }

    _defaultActionCreator(rawAction) {
        return rawAction;
    }

    getDispatchable() {
        return this.actionCreator(this.rawAction(), this.injectedProps);
    }

    rawAction() {
        return {
            type: this.type,
            ...this.data
        }
    }

}

export default Action;
