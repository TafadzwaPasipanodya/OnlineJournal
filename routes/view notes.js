var note = require('../models/notes');

module.exports = function(request, response) {
    note.retrieveAll(function(notes) {
        response.render('View Notes', {notes:notes});
    });
};