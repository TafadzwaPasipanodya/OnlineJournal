// Note page: Create, edit, save, view, or delete notes

var calendar = require('../models/calendar');

module.exports = function(request, response) {
    var username = request.session.username;
    
    // If logged in, go to calendar
    if (username) {
        var today = new Date();
        var month = today.getMonth(); //January is 0!
        var year = today.getFullYear();
       
        this_month_year = calendar.thisMonth() + " " + calendar.thisYear();
        
        calendar.daysInMonths(year, month, function(days){
            response.render('calendar',{calendarMonth:this_month_year,month:days,username:username});
            });
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};