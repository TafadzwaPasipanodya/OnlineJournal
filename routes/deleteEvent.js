// Calendar page: delete an event
//Only the organizer should be able to remove an event from the calendar


module.exports = function(request,response) {
    var username = request.session.username;
    
    // If logged in, go to addEvent
    if (username) {
        response.render('deleteEvent', {username:username});
    }
    // Sends to another route
    else {
        response.redirect('/');
    }
};
