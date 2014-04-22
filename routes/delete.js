var note = require('../models/notes');

module.exports = function(request, response) {
    var username = request.session.username;
    
    if (username) {
        note.delete(function(deletenotes) {
            response.render('delete',{notes:deletenotes});
        });
    }
    else {
        response.redirect('/');
    }
};