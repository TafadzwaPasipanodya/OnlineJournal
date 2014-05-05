// Tests for use cases at the index route
var notes = require('../../models/notes');
var zombie = require('zombie');
var browser = new zombie();

// Empty the database
exports['setup'] = function(test) {
    notes.deleteAll(function() {
        test.done();
    });
};

exports['make a note'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:8082/', function() {
        test.ok(browser.query('#addNote'));
        
        browser.
            fill('#addNote_name', 'name').
            fill('#addNote_content', 'content').
            pressButton('#addNote_save', function() {
                test.ok(browser.query('#logout'));
                browser.clickLink('#logout', function() {
                    test.done();
                });
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