var note = require('../models/notes');
var note = require('../models/notes');

module.exports = function(request, response) {
    var username = request.session.username;
    
    if (username) {
        note.delete(function(viewnotes) {
            response.render('allNotes',{notes:viewnotes});
        });
    }
    else {
        response.redirect('/');
    }
};