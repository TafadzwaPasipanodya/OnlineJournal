// Note page: Create, edit, save, view, or delete notes

var calendar = require('../models/calendar');

module.exports = function(request,response) {
    var username = request.session.username;
    
    // If logged in, go to calendar
    if (username) {
        calendar.daysInMonths(2837, 7, function(days){
            response.render('calendar',{month:days,username:username})
            });
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};