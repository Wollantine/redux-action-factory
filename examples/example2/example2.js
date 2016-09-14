var Mocha = require('mocha');

var mocha = new Mocha({});

mocha.addFile('examples/example2/test.js');

// Run the tests.
mocha.run(function(failures){
    process.on('exit', function () {
        process.exit(failures);  // exit with non-zero status if there were failures
    });
});
