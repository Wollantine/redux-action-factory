import {
    createAction,
    createRawAction,
    type,
    initialize,
    getConfig,
    config,
} from '../src/action-factory-lib';
import ActionFactory from '../src/ActionFactory';
import sinon from 'sinon';

const lib = {
    createAction,
    createRawAction,
    type,
    initialize,
    getConfig,
    config,
};

describe('action-factory', () => {

    describe('always', () => {

        it('should export initialize function', () => {
            lib.should.respondTo('initialize');
        });

        it('should export getConfig function', () => {
            lib.should.respondTo('getConfig');
        });

        it('should export type function', () => {
            lib.should.respondTo('type');
        });

        it('should export createAction function', () => {
            lib.should.respondTo('createAction');
        });

        it('should export createRawAction function', () => {
            lib.should.respondTo('createRawAction');
        });

        it('should export config const for testing purposes', () => {
            lib.should.have.property('config');
        });

    });

    describe('before initialize', () => {

        it('should throw when calling getConfig', () => {
            lib.getConfig.should.throw();
        });

        it('should throw when calling type', () => {
            lib.type.bind(null, 'FAKE_TYPE').should.throw();
        });

        it('should throw when calling createAction', () => {
            lib.createAction.bind(null, 'FAKE_TYPE').should.throw();
        });

        it('should throw when calling createRawAction', () => {
            lib.createRawAction.bind(null, 'FAKE_TYPE').should.throw();
        });

        it('should have no ActionFactory and no actionTypes', () => {
            lib.config.should.deep.equal({
                actionFactory: null,
                actionTypes: null,
            });
        });

    });

    const conf = {
        actions: {
            ACTION_NAME: {
                type: 'ACTION',
                args: {},
            },
        },
    };

    describe('initialize', () => {

        it('should create a new ActionFactory', () => {
            lib.initialize(conf);
            lib.config.actionFactory.should.be.instanceOf(ActionFactory);
        });

        it('should replace the ActionFactory when called again', () => {
            const firstActionFactory = lib.config.actionFactory;
            lib.initialize(conf);
            lib.config.actionFactory.should.not.equal(firstActionFactory);
        });

    });

    describe('getConfig', () => {

        it('should call ActionFactory.getConfig', () => {
            const method = sinon.spy(lib.config.actionFactory, 'getConfig');
            lib.getConfig();
            method.should.have.been.called;
        });

    });

    describe('type', () => {

        it('should return the type for an existing action name', () => {
            lib.type('ACTION_NAME').should.equal(conf.actions.ACTION_NAME.type);
        });

        it('should throw an Error for an unexisting action name', () => {
            lib.type.bind(undefined, 'UNEXISTING_NAME').should.throw(Error);
        });

        it('should throw an Error if missing name param', () => {
            lib.type.should.throw(Error);
        });

    });

    describe('createAction', () => {

        it('should call ActionFactory.createAction', () => {
            const method = sinon.spy(lib.config.actionFactory, 'createAction');
            lib.createAction('ACTION_NAME');
            method.should.have.been.called;
        });

    });

    describe('createRawAction', () => {

        it('should call ActionFactory.createRawAction', () => {
            const method = sinon.spy(lib.config.actionFactory, 'createRawAction');
            lib.createRawAction('ACTION_NAME');
            method.should.have.been.called;
        });

    });

});
