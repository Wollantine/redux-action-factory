import ActionFactory from '../../src/ActionFactory';

export default () => {

    let init = (...args) => (new ActionFactory(...args));

    it('should throw Error when called without args', () => {
        init.should.throw(Error);
    });

    it('should throw Error when called without actions config parameter', () => {
        init.bind(null, {actionCreators: ''}).should.throw(Error);
    });

    it('should throw Error when a config parameter is not recognised', () => {
        init.bind(null, {actions: {}, wrongParam: null}).should.throw(Error);
    });

    it('should not throw when called with only actions config parameter', () => {
        init.bind(null, {actions: {}}).should.not.throw();
    });

    it('should throw Error when actions config parameter is not an object', () => {
        init.bind(null, {actions: null}).should.throw(Error);
    });

    it('should throw SyntaxError when actions config parameter does not have the right structure', () => {
        init.bind(null, {actions: {
            ACTION_NAME: {
                wrong: 'wrong!'
            }
        }}).should.throw(Error);
    });

    it('should not throw when called with actionCreators config parameter', () => {
        init.bind(null, {actions: {}, actionCreators: {}}).should.not.throw();
    });

    it('should throw Error when actionCreators config parameter is not an object', () => {
        init.bind(null, {actions: {}, actionCreators: ''}).should.throw(Error);
    });

    it('should throw Error when actionCreators config parameter is required and not present', () => {
        init.bind(null, {actions: {
            ACTION_NAME: {
                type: "ACTION",
                args: [],
                creator: 'a'
            }
        }}).should.throw(Error);
    });

    it('should not throw when called with inject config parameter', () => {
        init.bind(null, {actions: {}, inject: {}}).should.not.throw();
    });

};
