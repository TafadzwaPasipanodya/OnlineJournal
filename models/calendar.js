// A model for a calendar collection
var mongojs = require('mongojs');

// Create calendar database
var db = mongojs('calendar', ['events']);

// function to get the total number of days in a given month
function numberOfDays(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
}

// function to get the current month's name
module.exports.thisMonth = function() {
    var today = new Date();
    var month = today.getMonth(); //January is 0!
    var months = ["January","February","March","April","May", "June","July", "August","November","December"];
    return months[month];
}

module.exports.thisYear = function() {
    var today = new Date();
    var year = today.getFullYear(); //January is 0
    return year;
}

// function to get all the days in a given month
module.exports.daysInMonths = function (year, month){
    var days = ["","","","","","","",
                "","","","","","","",
                "","","","","","","",
                "","","","","","","",
                "","","","","","","",
                "","","","","","",""]
    var d = new Date(year, month, 1);
    var n = d.getDay();

    var m = numberOfDays(year, month);

    for (var i = n; i<n+m; i++) {
        days[i] = i-(n-1);
    }
        return days;
}


module.exports.events = function(list_of_events,days_in_months){
    month_events = [[],[],[],[],[],[],[],
                    [],[],[],[],[],[],[],
                    [],[],[],[],[],[],[],
                    [],[],[],[],[],[],[],
                    [],[],[],[],[],[],[],
                    [],[],[],[],[],[],[]];
    
    
    list_of_events.forEach(function(event) {
        var date = parseInt(event.date);
        var index = days_in_months.indexOf(date);
        month_events[index].push(event);
    });
    return month_events;

}

// Function to get a list of visitors
module.exports.retrieve = function(month, year, callback) {
    db.events.find({month:month, year:year}, function(error, events_) {
        if (error) throw error;
        callback(events_);
    });
};
