// function to get the total number of days in a given month
function numberOfDays(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
}

// function to get the current month's name
module.exports.thisMonth = function() {
    var today = new Date();
    var month = today.getMonth()+1; //January is 0!
    var months = ["January","February","March","April","May", "June","July", "August","November","December"];
    return months[month];
}

// function to get all the days in a given month
module.exports.daysInMonths = function (year, month, callback){
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
        callback(days);
}
