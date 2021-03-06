// When viewing the notes allows users the option to edit a specific note

var calendar = require('../models/calendar');

module.exports = function(request, response) {
    // Get the username from the request session
    var username = request.session.username;
    
    var url = request.url;
    var index = url.lastIndexOf("/");
    
    // This is the '._id' from the database
    var event_id = url.substring(index+1);
    
    // If logged in
    if (username) {
        // find the particular event
        var list_of_events = request.session.events;
        var _event =  "trial";
        list_of_events.forEach(function(event){
            if (String(event._id) === String(event_id)) {
                _event = event;
                return;
            }
        });
        
        calendar.cancel_event(_event,function(success){
            //registered for event successfuly
            if(success){
                // remove event from our buffered list of events
                var index = list_of_events.indexOf(_event);
                if (index > -1) {
                    list_of_events.splice(index, 1);
                    request.session.events = list_of_events;
                }
                
                // redirect to home
                response.redirect('/');
            }
            else {
            //failed to register for event view the event page
            console.log(_event);
            response.redirect("/calendar/events/"+String(_event._id));}
        });
           
    }
        
    // Sends to another route
    else {
        response.redirect('/');
    }
};