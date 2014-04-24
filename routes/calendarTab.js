// Note page: Create, edit, save, view, or delete notes

var users = require('../models/calendar');

module.exports = function(request,response) {
    var username = request.session.username;
    
    // If logged in, go to calendar
    if (username) {
        response.render('calendar', {username:username});
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};