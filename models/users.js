// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('thunderapp', ['users']);

// Register a new user
module.exports.create = function(name, password, callback) {
    
    // Ask it to enxcrypt the password with a strength of 10 (which is standard)
    // While encrypting, work on the callback
    bcrypt.hash(password, 10, function(error,hash) {
        if (error) throw error;
        
        // it's a combination of find and update
        // When the callback happens, send the new user not the old one
        db.users.findAndModify({
            // These (query, update, new, upsert) are all parameters of findAndModify
            query: {name:name},
            // when this happens, insert it with this password
            update: {$setOnInsert:{password:hash}},
            new: true,
            // If you don't find one, create one
            upsert: true
        
        // If user exists, don't add it    
        }, function(error, user) {
            if (error) throw error;
            
            // hash is a function from bcrypt
            // It encrypts
            callback(user.password == hash);
        });
    });
};

// Delete all users from database
// Use a callback to make sure that it finishes removing before calling
// the test decalres that it's done in test/unit/users.js
module.exports.deleteAll = function(callback) {
    db.users.remove({}, function(error) {
        if (error)  throw error;
        callback();
    });
};

// Close the connection to the database
// If not, the test would look like it's "hung"
// and not close properly
module.exports.close = function(callback) {
    db.close(function(error) {
        if (error) throw error;
        callback();
    });
};

// Verify login credentials
module.exports.retrieve = function(name, password, callback) {
    
    db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            bcrypt.compare(password, user.password, function(error, success) {
                if (error) throw error;
                
                callback(success);
            })
        }
    });
};













