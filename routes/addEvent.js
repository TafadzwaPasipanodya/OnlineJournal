// Note page: Create, edit, or delete notes

//var notes = require('../models/calendar');

module.exports = function(request,response) {
    var username = request.session.username;
    
    //get the date
    var url = request.url;
    var index = url.lastIndexOf("/");
    
    // This is the desired date to use in calculations
    var date = url.substring(index+1);
    request.session.theDate = parseInt(date);
    
    // If logged in, go to addEvent
    if (username) {
        response.render('addEvent', {username:username});
    }
    // Sends to another route
    else {
        response.redirect('/');
    }
};
