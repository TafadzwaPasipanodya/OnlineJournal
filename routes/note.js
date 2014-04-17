// Note page: Show Note menu

module.exports = function(request,response) {
    var username = request.session.username;
    
    // If logged in, go to addNote
    if (username) {
        response.render('note', {username:username});
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};