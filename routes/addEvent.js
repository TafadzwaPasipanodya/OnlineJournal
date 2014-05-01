// Note page: Create, edit, or delete notes

//var notes = require('../models/calendar');

module.exports = function(request,response) {
    var username = request.session.username;
    
    // If logged in, go to addEvent
    if (username) {
        response.render('addEvent', {username:username});
    }
    // Sends to another route
    else {
        response.redirect('/');
    }
};
