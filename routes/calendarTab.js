// Note page: Create, edit, save, view, or delete notes

var calendar = require('../models/calendar');

module.exports = function(request, response) {
    var username = request.session.username;
    
    // If logged in, go to calendar
    if (username) {
        var today = new Date();
        var month = today.getMonth(); //January is 0!
        var year = today.getFullYear();
       // var events_ = calendar.events();
       
        var this_month_year = calendar.thisMonth() + " " + calendar.thisYear();
        
        var days = calendar.daysInMonths(year, month);
        
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