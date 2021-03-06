// Tests for use cases at the notes route
var notes = require('../../models/notes');
var zombie = require('zombie');
var browser = new zombie();

// Empty the database
exports['setup'] = function(test) {
    notes.deleteAll(function() {
        test.done();
    });
};

exports['log in (success)'] = function(test) {
    test.expect(2);
    console.log('hello');
    browser.visit('http://localhost:8082/', function() {
        test.ok(browser.query('#login'));
        console.log('hey');
        browser.
            fill('#login_name', 'Kayla').
            fill('#login_password', 'hello').
            pressButton('#login_submit', function() {
                test.ok(browser.query('#logout'));
                    console.log('whats up?');

                    test.done();
            });
    });
}

exports['make a note'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:8082/addNote', function() {
        test.ok(browser.query('#addNote'));
        
        browser.
            fill('#addNote_name', 'Hello').
            fill('#addNote_content', 'World!').
            pressButton('#addNote_save', function() {
                test.ok(browser.query('#logout'));
                    test.done();
            });
    });
}




// Empty the database and close the connection
exports['cleanup'] = function(test) {
    notes.deleteAll(function() {
        notes.close(function() {
            test.done();
        });
    });
};
