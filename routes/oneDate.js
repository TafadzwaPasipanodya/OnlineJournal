// Under the Note Menu: allows user to view all notes

var calendar = require('../models/calendar');
var validator = require('validator');

module.exports = function(request, response) {
    // Get the username from the request session
    var username = request.session.username;
    
    var url = request.url;
    var index = url.lastIndexOf("/");
    
    // This is the desired date
    var date = url.substring(index+1);
    
    // Get the contents of the note
    var month = request.session.month;
    var year = request.session.year;
    
    //if logged in
    if (username) {
        calendar.retrieve(parseInt(month), parseInt(year), function(list_of_events){
            
            var day_events = [];
            list_of_events.forEach(function(event){
                if (event.date === parseInt(date)){
                    day_events.push(event);
                }
            });
            response.render('viewdate.ejs', {events:day_events});
        });
    }
    
    // person is not logged in
    else {
        reponse.redirect('/calendarTab');
    }
};
