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

// helper method
module.exports.events = function(list_of_events, days_in_months){
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

// Function to get a list of events in a given month
module.exports.retrieve = function(month, year, callback) {
    db.events.find({month:month, year:year}, function(error, events_) {
        if (error) throw error;
        callback(events_);
    });
};

// Function to add an event to the DB
module.exports.create = function(name, date, time,location, organizer, callback){
    var year = date.toString().substring(0,4);
    var month = date.toString().substring(5,7);
    var day = date.toString().substring(8,date.toString().length);
    
    db.events.findOne({year:year, month:month, date:day,name:name}, function(error, event) {
        if (error) throw error;
        
        if (!event){
            event = {name:name, year:parseInt(year), month:parseInt(month)-1, date:parseInt(day),time:time,location:location, organizer:organizer, attending:[{person:organizer}]};
        }
        
        db.events.save(event, function(error) {
            if (error) throw error;
        });
    });
    
    callback(true);
};

// Function to update a db entry
module.exports.update = function(event, user, callback){
   
    event.attending.push({person:user});
    
    db.events.findOne({_id:event._id}, function(error, _event) {
        if (error) throw error;
        
        // if event is not present #should be impossible
        if (!_event){
            db.events.save(event, function(error) {
                if (error) throw error;
            });
        }
        //event present in database
        else {
            db.events.remove({_id:mongojs.ObjectId(event._id)}, function(error) {
            if (error) throw error;
        });
            db.events.save(event, function(error) {
            if (error) throw error;
        });   
        }
        
    });
    
    callback(true);
};

//delete an event from the calendar
module.exports.cancel_event = function(event, callback){
    
    db.events.findOne({_id:mongojs.ObjectId(event._id)}, function(error, _event) {
        if (error) throw error;
        
            db.events.remove(_event, function(error) {
            if (error) throw error;
        });
    });
    
    callback(true);
};
