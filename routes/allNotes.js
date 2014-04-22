// Under the Note Menu: allows user to view all notes

var note = require('../models/notes');

module.exports = function(request, response) {
    // Get the username from the request session
    var username = request.session.username;
    
    // If logged in, then...
    if (username) {
        // Render all notes from database
        note.retrieveAll(function(allNotes) {
            response.render('allNotes', {notes:allNotes, username:username});
        });
    }
    else {
        response.redirect('/');
    }
};