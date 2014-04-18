var note = require('../models/notes');

module.exports = function(request, response) {
    note.retrieveAll(function(allNotes) {
        response.render('allNotes', {notes:allNotes});
    });
};