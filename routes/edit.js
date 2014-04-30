// When viewing the notes allows users the option to edit a specific note

var notes = require('../models/notes');

module.exports = function(request,response) {
    var username = request.session.username;
    var itemid = request.body.itemid;

        // If logged in
    if (username) {
        response.redirect('/editnote');
        }
        
    // Sends to another route
    else {
        response.redirect('/');
    }
};