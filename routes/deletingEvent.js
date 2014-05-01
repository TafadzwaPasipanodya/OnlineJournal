// Registration page: try to register
var calendar = require('../models/calendar');
var validator = require('validator');


module.exports = function(request, response) {
    var username = request.session.username;
    
    // Create it and receive whether or not it succeeded 
    calendar.delete_event(name, date, username, function(success) {
        
        if (success) {
            response.redirect('/calendarTab');
        }
        
        else {
            request.session.error = 'Failed to delete event!';
        }
        response.redirect('/');
    });
};