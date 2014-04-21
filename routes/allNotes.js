var note = require('../models/notes');

module.exports = function(request, response) {
    var username = request.session.username;
    
    if (username) {
        note.retrieveAll(function(allNotes) {
            response.render('allNotes',{notes:allNotes});
        });
    }
    else {
        response.redirect('/');
    }
};