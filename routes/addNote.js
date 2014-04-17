// Note page: Create, edit, or delete notes

module.exports = function(request,response) {
    var username = request.session.username;
    
    // If logged in, go to addNote
    if (username) {
        response.render('addNote', {username:username});
    }
    
    // Sends to another route
    else {
        response.redirect('/');
    }
};