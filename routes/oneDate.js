// Under the Note Menu: allows user to view all notes

var calendar = require('../models/calendar');
var validator = require('validator');

module.exports = function(request, response) {
    // Get the username from the request session
    var username = request.session.username;
    
    var url = request.url;
    var index = url.lastIndexOf("/");
    
    // This is the desired date to use in calculations
    var date = url.substring(index+1);
    var month =request.session.month;
    
    // Get the date to display
    var year = request.session.year;
    day = calendar.thisMonth(month) + " " +String(date) + ", " + String(year);
    
    //if logged in
    if (username) {
        var list_of_events = request.session.events;
            
            var day_events = [];
            list_of_events.forEach(function(event){
                if (event.date === parseInt(date)){
                    day_events.push(event);
                }
            });
            response.render('viewdate.ejs', {events:day_events, day:day});
    }
    
    // person is not logged in
    else {
        reponse.redirect('/calendarTab');
    }
};
