// When viewing the notes allows users the option to delete a specific note

var notes = require('../models/notes');

module.exports = function(request,response) {
    var username = request.session.username;
    var itemid = request.body.itemid;
    
    // If logged in
    if (username) {
        notes.del(itemid);
        
        response.redirect('/allNotes');
        }
        
    // Sends to another route
    else {
        response.redirect('/');
    }
};
