
var notes = require('../models/notes');

module.exports = function(request,response) {
    var username = request.session.username;

    // If logged in
    if (username) {
        
        response.delete({name:name}, {content:content}, {username:username});
    }
    // Sends to another route
    else {
        response.redirect('/');
    }
};
