var notes = require('../models/notes');

module.exports = function(request, response) {
    var url = request.url;
    var index = url.lastIndexOf("/");
    var itemid = url.substring(index+1);
    notes.retrieveOne(itemid, function(oneNote) {
        response.render('oneNote', {note:oneNote});
    });
};