// Index page: home page, or login

// Looks different depending on whether logged in or not
module.exports = function(request, response) {
   
   // request the username's session 
   var username = request.session.username;
   
   // Undefined is treated as false
   // Shows the login page if you're logged in
   if (username) {
        response.render('home', {username:username});
   }
   
   // Delete request error after rendering to get rid of the error
   // Want the user to only see it once
   else {
        response.render('login', {error:request.session.error});
        delete request.session.error;
   }
};