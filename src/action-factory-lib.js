import ActionFactory from './ActionFactory';

export const config = {
    actionFactory: null,
    actionTypes: null
};

export const initialize = (conf) => {
    config.actionFactory = new ActionFactory(conf);
    config.actionTypes = conf.actions;
};

export const getConfig = () => {
    return config.actionFactory.getConfig();
};

export const createAction = (actionName, params) => {
    return config.actionFactory.createAction(actionName, params);
};

export const createRawAction = (actionName, params) => {
    return config.actionFactory.createRawAction(actionName, params);
};

export const type = (actionName) => {
    if (typeof actionName == 'undefined') {
        throw new Error('Action name required');
    }
    if (!config.actionTypes) {
        throw new Error('The method "initialize" should be called before "type".');
    }
    if (typeof config.actionTypes[actionName] == 'undefined') {
        throw new Error('Action '+actionName+' has not been defined');
    }
    return config.actionTypes[actionName].type;
};
