var sanitization = require('../../lib/index').actionsSanitizationSchema;
var validation = require('../../lib/index').actionsValidationSchema;
var inspector = require('schema-inspector');
var actions = require('./actions.json');
var assert = require('chai').assert;

describe('Actions Schema', function () {

    it('should be a valid schema', function () {
        inspector.sanitize(sanitization, actions);
        var result = inspector.validate(validation, actions);
        assert.ok(result.valid, result.format());
    });

});
