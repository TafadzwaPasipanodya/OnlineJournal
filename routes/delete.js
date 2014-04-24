// When viewing the notes allows users the option to delete a specific note

var notes = require('../models/notes');

module.exports = function(request,response) {
    var username = request.session.username;

    // If logged in
    if (username) {
        notes.del({name:name}, {username:username});
        }
    // Sends to another route
    else {
        response.redirect('/');
    }
};
