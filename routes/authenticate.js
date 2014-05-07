 // Registration page: try to register
var users = require('../models/users');
var validator = require('validator');
    // Grab info from form
 module.exports = function(request,response) {   
    var name = validator.escape(request.body.name);
    var password = validator.escape(request.body.password);
    
    // Create it and receive whether or not it succeeded 
    users.create(name, password, function(success) {
        
        if (success) {
            request.session.username = name;
        }
        
        else {
            request.session.error = 'Username '+name+' is not available.';
        }
        
        response.redirect('/');
    });
};