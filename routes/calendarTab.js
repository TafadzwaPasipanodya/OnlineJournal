// Note page: Create, edit, save, view, or delete notes

var calendar = require('../models/calendar');

module.exports = function(request, response) {
    var username = request.session.username;
    
    // If logged in, go to calendar
    if (username) {
        //get today's date
        var today = new Date();
        var month = today.getMonth(); //January is 0!
        var year = today.getFullYear();
        
        //store this month and year on the cookies
        request.session.month = month;
        request.session.year = year;
       
       // get the name of this month and year to display on calendar
        var this_month_year = calendar.thisMonth() + " " + calendar.thisYear();
        
        // get a list of all the dates and which days they fall on
        var days = calendar.daysInMonths(year, month);
        
        // display the main calendar
        calendar.retrieve(parseInt(month), parseInt(year), function(list_of_events){
            events_ = calendar.events(list_of_events, days);
            response.render('calendar', {username:username, calendarMonth:this_month_year, month:days, events:events_});
            }
        );
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};