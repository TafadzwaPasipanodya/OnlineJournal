// Note page: Create, edit, save, view, or delete notes

var calendar = require('../models/calendar');

module.exports = function(request, response) {
    var username = request.session.username;
    var date =parseInt(request.session.the_date);
    var year = parseInt(request.session.year);
    var month = parseInt(request.session.month);
    var days = parseInt(new Date(year, month, 0).getDate());
    
    // If logged in, go to calendar
    if (username) {
        if (date>0 && date<days) {
            request.session.the_date = parseInt(request.session.the_date) +1;
        }
        else{
            if (request.session.month <11) {
                request.session.month = parseInt(request.session.month) +1;
                request.session.the_date = 1;
            }
            else{
                request.session.year = parseInt(request.session.year) +1;
                request.session.month = 0;
                request.session.the_date = 1;
            }
        }
        response.redirect('/calendar/'+String(request.session.the_date));
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};