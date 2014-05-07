// Tests for use cases at the notes route
var notes = require('../../models/notes');
var users = require('../../models/users');
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
            fill('#login_name', 'username').
            fill('#login_password', 'password').
            pressButton('#login_submit', function() {
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