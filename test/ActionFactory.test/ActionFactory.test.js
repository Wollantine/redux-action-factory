import construct from './construct.test';
import getConfig from './getConfig.test';
import createAction from './createAction.test';
import createRawAction from './createRawAction.test';

describe('ActionFactory', () => {

    describe('on creation', construct);

    describe('getConfig', getConfig);

    describe('createAction', createAction);

    describe('createRawAction', createRawAction);

});
