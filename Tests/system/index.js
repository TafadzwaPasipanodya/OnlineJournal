// Skyler Ng
// Tests for user cases at the index route

// Zombie package lets us create an object that represents a browser
var zombie = require('zombie');
var users = require('../../models/users');

// browser is the object we created to represent a browser
var browser = new zombie();

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

// Make an account (success)
exports['make an account (success)'] = function(test) {
    test.expect(2);
    
    // Pretend to go through the browser by
    // pretending to go to the URL
    browser.visit('http://localhost:8080/', function () {
        // Check if the browser is right
        // Does the response contain this particular item?
        // Does the HTML have an element with the id of 'register'?
        test.ok(browser.query('#register'));
        
        // Better to use callback to make sure it calls when it's all finished
        browser.
            fill('#register_name', 'username')
            fill('#register_password', 'password')
            pressButton('#register_submit', function() {
                test.ok(browser.query('#logout'));
                    browser.clickLink('#logout', function() {
                        test.done();
                    });
            });
    });
};

// Make an account (fail)
exports['make an account (fail)'] = function(test) {
    test.expect(2);
    
    // Pretend to go through the browser by
    // pretending to go to the URL
    browser.visit('http://localhost:8080/', function () {
        // Check if the browser is right
        // Does the response contain this particular item?
        // Does the HTML have an element with the id of 'register'?
        test.ok(browser.query('#register'));
        
        // Better to use callback to make sure it calls when it's all finished
        browser.
            fill('#register_name', 'username')
            fill('#register_password', 'password')
            pressButton('#register_submit', function() {
                // Logout does not exist
                test.ok(browser.query('#error'));
                    test.done();
            });
    });
};

// Log in (success)
exports['log in (success)'] = function(test) {
    test.expect(2);
    
    // Pretend to go through the browser by
    // pretending to go to the URL
    browser.visit('http://localhost:8080/', function () {
        // Check if the browser is right
        // Does the response contain this particular item?
        // Does the HTML have an element with the id of 'register'?
        test.ok(browser.query('#register'));
        
        // Better to use callback to make sure it calls when it's all finished
        browser.
            fill('#login_name', 'username')
            fill('#login_password', 'password')
            pressButton('#login_submit', function() {
                test.ok(browser.query('#logout'));
                    browser.clickLink('#logout', function() {
                        test.done();
                    });
            });
    });
};

// Log in (fail)
exports['log in (failure)'] = function(test) {
    test.expect(2);
    
    // Pretend to go through the browser by
    // pretending to go to the URL
    browser.visit('http://localhost:8080/', function () {
        // Check if the browser is right
        // Does the response contain this particular item?
        // Does the HTML have an element with the id of 'register'?
        test.ok(browser.query('#register'));
        
        // Better to use callback to make sure it calls when it's all finished
        browser.
            fill('#login_name', 'badusername')
            fill('#login_password', 'badpassword')
            pressButton('#login_submit', function() {
                test.ok(browser.query('#error'));
                    test.done();
            });
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