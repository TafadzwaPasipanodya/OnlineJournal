// Note page: Create, edit, save, view, or delete notes

var calendar = require('../models/calendar');

module.exports = function(request, response) {
    var username = request.session.username;
    
    // If logged in, go to calendar
    if (username) {
        //get today's date
        var today = request.session.today;
        var month = request.session.month;
        var year = request.session.year;
       
       // get the name of this month and year to display on calendar
        var this_month_year = calendar.thisMonth(month) + " " + calendar.thisYear(year);
        
        // get a list of all the dates and which days they fall on
        var days = calendar.daysInMonths(year, month);
        
        // display the main calendar
        calendar.retrieve(parseInt(month), parseInt(year), function(list_of_events){
            events_ = calendar.events(list_of_events, days);
            // put list of events on session so as to reduce database accesses
            request.session.events = list_of_events;
            response.render('calendar', {username:username, calendarMonth:this_month_year, month:days, events:events_});
            }
        );
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};