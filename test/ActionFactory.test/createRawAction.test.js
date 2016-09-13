import ActionFactory from '../../src/ActionFactory';
import rawActionTest from './rawAction.test';

export default () => {


    const af = new ActionFactory({
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
        },
        actionCreators: {
            someMinorGod: () => (42),
        },
    });

    const createRawAction = af.createRawAction.bind(af);

    // It should create a raw action
    describe('when action does not define creator', rawActionTest(createRawAction, 'CREATORLESS_ACTION'));

    // Even if it has an action creator
    describe('when action defines creator', rawActionTest(createRawAction, 'CREATORLY_ACTION'));
};
