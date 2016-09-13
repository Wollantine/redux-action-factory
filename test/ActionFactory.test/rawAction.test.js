
export default (create, actionName) => (() => {

    it('should return an object', () => {
        create(actionName, {data: 'a'}).should.be.an('object');
    });

    it('should return an action with the correct type', () => {
        create(actionName, {data: 'a'}).should.have.property('type', actionName);
    });

    it('should return an action with the passed data', () => {
        create(actionName, {data: 'a'}).should.have.property('data', 'a');
    });

    it('should ignore non specified data params', () => {
        create(actionName, {data: 'a', unspecified: 'b'}).should.deep.equal({
            type: actionName,
            data: 'a',
        });
    });

    it('should throw Error upon non existing type', () => {
        create.bind(undefined, 'I DO NOT EXIST').should.throw(Error);
    });

    it('should throw SyntaxError upon missing param', () => {
        create.bind(undefined, actionName).should.throw(Error);
    });

});
