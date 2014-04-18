var notes = require('../models/notes');

var validator = require('validator');

module.exports = function(request, response) {
    var name = validator.escape(request.body.note);
    var itemid = request.body.itemid;

    notes.create(name, itemid, function() {
        response.redirect('/note/'+itemid);
    });
};