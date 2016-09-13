import Action from '../src/Action';
import sinon from 'sinon';


const buildSpecs = (type = 'ACTION_NAME', args = {}, sanitize, creator) => {
    let specs = {
        type,
        args
    };
    if (sanitize) specs.sanitize = sanitize;
    if (creator) specs.creator = creator;
    return specs;
};

describe('Action', () => {

    it('should throw if called without specs', () => {
        const createAction = () => {new Action()};
        createAction.should.throw(Error);
    });

    it('should respond to getDispatchable method', () => {
        const action = new Action(buildSpecs());
        action.should.respondTo('getDispatchable');
    });

    it('should respond to rawAction method', () => {
        const action = new Action(buildSpecs());
        action.should.respondTo('rawAction');
    });

    it('should create a valid action object', () => {
        const specs = buildSpecs(undefined, {data: {type: 'string'}});
        const action = new Action(specs, {data: 'a'});
        action.getDispatchable().should.deep.equal({
            type: 'ACTION_NAME',
            data: 'a'
        });
    });

    it('should validate the data against the schema', () => {
        const createAction = (...params) => {new Action(...params)};
        const specs = buildSpecs(undefined, {type: 'object', properties: {data: {type: 'string'}}});
        createAction.bind(null, specs, {data: 42}).should.throw(Error);
    });

    it('should sanitize the data with the sanitize schema', () => {
        const specs = buildSpecs(undefined,
            {type: 'object', properties: {data: {type: 'string'}}},
            {type: 'object', properties: {data: {type: 'string'}}});
        const action = new Action(specs, {data: 42});
        action.getDispatchable().should.deep.equal({
            type: 'ACTION_NAME',
            data: '42'
        })
    });

    describe('upon calling getDispatchable', () => {

        const specs = buildSpecs(undefined, {type: 'object', properties: {data: {type: 'string'}}});

        it('should return the raw action if no creator was supplied', () => {
            const action = new Action(specs, {data: 'a'});
            action.getDispatchable().should.deep.equal(action.rawAction());
        });

        it('should call the supplied action creator', () => {
            const creator = sinon.spy();
            const action = new Action(specs, {data: 'a'}, creator);
            action.getDispatchable();
            creator.should.have.been.called;
        });

        it('should call the action creator with the raw action and the injected props', () => {
            const creator = sinon.spy();
            const injectedProps = {
                a: 'I want to be injected',
                b: () => {return 'I will return if I am injected'}
            };
            const action = new Action(specs, {data: 'a'}, creator, injectedProps);
            const rawAction = action.rawAction();
            action.getDispatchable();
            creator.should.have.been.calledWith(rawAction, injectedProps);
        });

    });

});
