// Unit tests for the users collections
var users = require('../../models/users');

// Empty the database
exports['setup'] = function(test) {
    users.deleteAll(function() {
    test.done();
    });
};

// Successfull Registration
exports['register a user'] = function(test) {
    test.expect(1);
    users.create('username','password', function(success) {
        test.ok(success);
        test.done();
    });
};

// Failed Registration
exports['register a duplicate user'] = function(test) {
    test.expect(1);
    users.create('username','password', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Sucessful Login
exports['login a user'] = function(test) {
    test.expect(1);
    users.retrieve('username','password', function(success) {
        test.ok(success);
        test.done();
    });
};

// Unsucessfull Login
// Successfull Registration
exports['register a user'] = function(test) {
    test.expect(1);
    users.create('username','password', function(success) {
        test.ok(success);
        test.done();
    });
};

// Failed Registration
exports['register a duplicate user'] = function(test) {
    test.expect(1);
    users.create('username','password', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Unsucessful Login
exports['login with bad username'] = function(test) {
    test.expect(1);
    users.retrieve('badusername','password', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Unsuccessful Login
exports['login with bad password'] = function(test) {
    test.expect(1);
    users.retrieve('badusername','badpassword', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Empty the database and close the connection
exports['cleanup'] = function(test) {
    users.deleteAll(function() {
        users.close(function() {
            test.done();
        });
    });
};