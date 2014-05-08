// When viewing the notes allows users the option to edit a specific note

var calendar = require('../models/calendar');

// get an event with the matching ID
var getEvent = function(list_of_events, event_id){
    var _event =  "trial";
        list_of_events.forEach(function(event){
            if (String(event._id) === String(event_id)) {
                _event = event;
                return;
            }
        });
    return _event
};

module.exports = function(request, response) {
    // Get the username from the request session
    var username = request.session.username;
    //get all events from session
    var list_of_events = request.session.events;
    
    // get event ID from url
    var url = request.url;
    var index = url.lastIndexOf("/");
    var event_id = url.substring(index+1);
    
    // If logged in
    if (username) {
        // find the particular event
        var _event =  getEvent(list_of_events, event_id);
        
        
        //update db
        calendar.update(_event, username,function(success){
            //registered for event successfuly
            if(success){
                response.redirect("/calendar/events/"+String(_event._id));
            }else{
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