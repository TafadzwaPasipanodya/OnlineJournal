// Under the Note Menu: allows user to view all notes

var notes = require('../models/notes');
var validator = require('validator');

module.exports = function(request, response) {
    // Get the username from the request session
    var username = request.session.username;
    
    var url = request.url;
    var index = url.lastIndexOf("/");
    
    // This is the '._id' from the database
    var noteid = url.substring(index+1);
    
    // Get the contents of the note
    var content = request.body.content;
    
    if (username) {
        notes.retrieveOne(noteid, function(note) {
            response.render('oneNote', {note:note, username:username});
        });
    }
    else {
        reponse.redirect('/');
    }
};
