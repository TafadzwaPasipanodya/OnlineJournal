// Profile page: profile or redirect

module.exports = function(request,response) {
    
    var username = request.session.username;
    
    // If logged in, goes to the profile
    if (username) {
        response.render('profile', {username:username});
    }
    
    // If logged out, go to index page
    else {
        response.redirect('/');
    }
};