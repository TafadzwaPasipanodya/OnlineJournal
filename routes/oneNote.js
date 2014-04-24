// Under the Note Menu: allows user to view all notes

var notes = require('../models/notes');

module.exports = function(request, response) {
    // Get the username from the request session
    var username = request.session.username;
    
    var url = request.url;
    var index = url.lastIndexOf("/");
    
    // This is the '._id' from the database
    var itemid = url.substring(index+1);
    
    if (username) {
        notes.retrieveOne(itemid, function(oneNote) {
            response.render('oneNote', {note:oneNote, username:username});
        });
    }
    else {
        reponse.redirect('/');
    }
};