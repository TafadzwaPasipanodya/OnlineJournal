// Under the Note Menu: allows user to view all notes

var calendar = require('../models/calendar');
var validator = require('validator');

module.exports = function(request, response) {
    
    // Get the username from the request session
    var username = request.session.username;
    
    var url = request.url;
    var index = url.lastIndexOf("/");
    
    // This is the desired event's id
    var event_id = url.substring(index+1);
    console.log(event_id);
    
    
    
    //if logged in
    if (username) {
        // find the particular event
        var list_of_events = request.session.events;
        var _event =  "trial";
        
        for (var i=0; i<list_of_events.length; i++) {
            var event = list_of_events[i];
            if (String(event._id) === String(event_id)) {
                _event = event;
                break;
            }
        }
        console.log(_event);
        response.render('viewevent.ejs', {username:username, event:_event});
        
    }
    
    // person is not logged in
    else {
        reponse.redirect('/calendarTab');
    }
};
