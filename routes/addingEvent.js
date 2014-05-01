// Registration page: try to register
var calendar = require('../models/calendar');
var validator = require('validator');


module.exports = function(request, response) {
    var username = request.session.username;
    // Grab info from form
    var name = validator.escape(request.body.name);
    var date = validator.escape(request.body.date);
    
    // Create it and receive whether or not it succeeded 
    calendar.create(name, date, username, function(success) {
        
        if (success) {
            response.redirect('/calendarTab');
        }
        
        else {
            request.session.error = 'Failed to create Event!';
        }
        
        response.redirect('/');
    });
};