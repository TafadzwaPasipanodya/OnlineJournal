// Note page: Create, edit, save, view, or delete notes

var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    response.render('note', {username:username});
    
    var username = request.session.username;
    
    // If logged in, goes to the profile
    if (username) {
        response.render('note', {username:username});
    }
    
    // If logged out, go to index page
    else {
        response.redirect('/');
    }
};

// Delete a note

// View notes

// Save notes