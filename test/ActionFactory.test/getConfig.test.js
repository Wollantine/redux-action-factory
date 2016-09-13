import ActionFactory from '../../src/ActionFactory';

export default () => {

    it('should return the config passed in initialize', () => {
        const expected = {
            actionCreators: {},
            actions: {
                ACTION_NAME: {
                    type: 'ACTION_NAME',
                    args: {},
                    sanitize: {}
                }
            }
        };
        let af = new ActionFactory({actions: {ACTION_NAME: {type: 'ACTION_NAME'}}});
        af.getConfig().should.deep.equal(expected);
    });

};
