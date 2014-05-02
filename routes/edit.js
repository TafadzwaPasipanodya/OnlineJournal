// When viewing the notes allows users the option to edit a specific note

var notes = require('../models/notes');

module.exports = function(request,response) {
    // Get the username from the request session
    var username = request.session.username;
    
    var url = request.url;
    var index = url.lastIndexOf("/");
    
    // This is the '._id' from the database
    var noteid = url.substring(index+1);
    
    // Get the contents of the note
    var content = request.body.content;
    
    // If logged in
    if (username) {
        notes.edit(noteid, content, function(note) {
            response.render('oneNote', {username:username, note:note});
        })
    }
        
    // Sends to another route
    else {
        response.redirect('/');
    }
};