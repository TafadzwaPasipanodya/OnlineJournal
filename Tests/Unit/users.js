// Skyler Ng
// Unit tests for the users collections

// This is to get to the database code in the folder models
var users = require('../../models/users');

// Before testing user collection, we want to put it in a known state
// First test is always a setup test

// Empty the database
// 'test' is the callback in the deleteAll function in /models/users.js
exports['setup'] = function(test) {
    users.deleteAll(function() {
    // At the end of all tests, need to call test.done()
    // Thiw will tell it that it did so the task successfully
    // And will then move on to the next tests
    test.done();
    });
};

// Successful registration
exports['register a user'] = function(test) {
    // When using test.ok(), tell it how many to expect so that it doesn't end abruptly
    // and claim that it's ok
    test.expect(1);
    users.create('username', 'password', function(success) {
        // Checks if success is true
        test.ok(success);
        test.done();
    });
};

// Unsuccessful login
exports['register a duplicate user'] = function(test) {
    test.expect(1);
    users.create('username', 'password', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Successful login
exports['login a user'] = function(test) {
    test.expect(1);
    users.retrieve('username', 'password', function(success) {
        test.ok(success);
        test.done();
    });
};

// Unsuccessful login
exports['login with bad username'] = function(test) {
    test.expect(1);
    users.retrieve('badusername', 'password', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Unsuccessful login
exports['login with bad password'] = function(test) {
    test.expect(1);
    users.retrieve('username', 'badpassword', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Empty the database and close the connection to database
exports['cleanup'] = function(test) {
    users.deleteAll(function() {
        users.close(function() {
            test.done();
        });
    });
};
