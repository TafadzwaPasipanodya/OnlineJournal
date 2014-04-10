// Login page: try to authenticate
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    // Grab info from form
    // Validator makes sure there're no funny business (that there're no code inputted)
    var name = validator.escape(request.body.name);
    var password = validator.escape(request.body.password);
    
    // Give a callback to tell whether it was successful
    users.retrieve(name, password, function(success) {
        
        if (success) {
            request.session.username = name;
        }
        
        else {
            request.session.error = "Wrong username or password.";
        }
        
        // Sends user to another route
        response.redirect('/');
    });
};