// Registration page: try to register
var calendar = require('../models/calendar');
var validator = require('validator');


module.exports = function(request, response) {
    var username = request.session.username;
    // Grab info from form
    var name = validator.escape(request.body.name);
    var time = validator.escape(request.body.time);
    var location = validator.escape(request.body.location);
    
    //grab infor from session
    var year = request.session.year;
    var month = request.session.month;
    var day = request.session.theDate;
    var date = {year:year, month:month+1,date:day};
    
    // Create it and receive whether or not it succeeded 
    calendar.create(name, date,time,location, username, function(success) {
        
        if (success) {
            response.redirect('/calendarTab');
        }
        
        else {
            request.session.error = 'Failed to create Event!';
        }
        
        response.redirect('/');
    });
};