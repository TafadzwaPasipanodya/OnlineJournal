// Note page: Create, edit, save, view, or delete notes

var calendar = require('../models/calendar');

module.exports = function(request, response) {
    var username = request.session.username;
    var date =request.session.the_date;
    var year = request.session.year;
    var month = request.session.month;
    var days = new Date(year, month, 0).getDate();
    
    // If logged in, go to calendar
    if (username) {
        if (date>1 && date<days+1) {
            request.session.the_date = request.session.the_date -1;
        }
        else{
            if (request.session.month >0) {
                request.session.month = request.session.month -1;
                request.session.the_date = days;
            }
            else{
                request.session.year = request.session.year -1;
                request.session.month = 11;
                request.session.the_date = +days;
            }
        }
        response.redirect('/calendar/'+String(request.session.the_date));
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};