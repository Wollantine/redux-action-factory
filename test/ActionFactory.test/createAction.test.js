import ActionFactory from '../../src/ActionFactory';
import rawActionTest from './rawAction.test';
import sinon from 'sinon';

export default () => {

    const conf = {
        actions: {
            CREATORLESS_ACTION: {
                type: 'CREATORLESS_ACTION',
                args: {
                    type: 'object',
                    strict: true,
                    properties: {
                        data: {type: 'string'},
                    },
                },
                sanitize: {
                    type: 'object',
                    strict: true,
                    properties: {
                        data: {},
                    },
                },
            },
            CREATORLY_ACTION: {
                type: 'CREATORLY_ACTION',
                args: {
                    type: 'object',
                    strict: true,
                    properties: {
                        data: {type: 'string'},
                    },
                },
                sanitize: {
                    type: 'object',
                    strict: true,
                    properties: {
                        data: {},
                    },
                },
                creator: 'someMinorGod',
            },
            WRONG_CREATOR_ACTION: {
                type: 'WRONG_CREATOR_ACTION',
                args: {},
                creator: 'realGod', // doesn't exist
            },
        },
        actionCreators: {
            someMinorGod: () => (42),
        },
        inject: {
            injectedData: 'Vaccine',
        },
    };

    const af = new ActionFactory(conf);

    const createAction = af.createAction.bind(af);

    describe('when action does not define creator', rawActionTest(createAction, 'CREATORLESS_ACTION'));

    describe('when action defines creator', () => {

        it('should return whatever the defined creator returns', () => {
            createAction('CREATORLY_ACTION', {data: 'a'}).should.equal(42);
        });

        it('should throw Error upon non existing creator', () => {
            createAction.bind(undefined, 'WRONG_CREATOR_ACTION').should.throw(Error);
        });

        it('should inject data passed on config.inject', () => {
            const creator = sinon.spy(conf.actionCreators, 'someMinorGod');
            createAction('CREATORLY_ACTION', {data: 'a'});
            creator.should.have.been.calledWith({
                type: 'CREATORLY_ACTION',
                data: 'a',
            }, {injectedData: 'Vaccine'});
        });

    });
};
