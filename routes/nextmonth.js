// Note page: Create, edit, save, view, or delete notes

var calendar = require('../models/calendar');

module.exports = function(request, response) {
    var username = request.session.username;
    
    // If logged in, go to calendar
    if (username) {
        if (request.session.month<11) {
            request.session.month = request.session.month +1;
        }
        else{
            request.session.year = request.session.year +1;
            request.session.month = 0;
        }
        response.redirect('/calendarTab');
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};