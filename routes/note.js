var notes = require('../models/notes');
var validator = require('validator');

module.exports = function(request, response) {
    var name = validator.escape(request.body.name);
    var content = validator.escape(request.body.content);

    notes.create(name, content, function() {
        response.redirect('/noteTab');
    });
};