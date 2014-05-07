// A server with user authentication

var express = require('express');

// Create a server
var app = express();

// Configure the server
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(express.urlencoded({limit:'1kb'}));
app.use(express.static(__dirname+'/statics'));

// Enable sessions
// Used to remember user throughout a session (based on cookie)
// You store a cookie (little files) into the user's browser
app.use(express.cookieParser());
// Encypts the cookie
app.use(express.session({secret:'CS 340 4/14/2014'}));

// Route the requests
app.get('/', require('./routes/index'));
app.post('/login', require('./routes/login'));
app.get('/reg',require('./routes/register'));
app.post('/register', require('./routes/authenticate'));
app.get('/profile', require('./routes/profile'));
app.get('/logout', require('./routes/logout'));
app.get('/noteTab', require('./routes/noteTab'));
app.post('/note', require('./routes/note'));
app.get('/allNotes', require('./routes/allNotes'));
app.get('/note/:id', require('./routes/oneNote'));
app.post('/oneNote', require('./routes/oneNote'));
app.get('/addNote', require('./routes/addNote'));
app.post('/addNote', require('./routes/addNote'));
app.post('/delete', require('./routes/delete'));
app.get('/calendarTab', require('./routes/calendarTab'));
app.post('/edit/:id', require('./routes/edit'));
app.get('/addEvent', require('./routes/addEvent'));
app.post('/addingEvent', require('./routes/addingEvent'));
app.get('/calendar/:id', require('./routes/oneDate'));
app.get('/calendar/events/:id', require('./routes/oneevent'));
app.post('/calendar/events/attend/:id', require('./routes/attend_event'));



// Default route
app.get('*', function(request,response) {
    response.send('Nothing to see here~!');
});

// Start the server
app.listen(8082);
console.log('Server is up.');