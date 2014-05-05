// Unit tests for the users collections
var notes = require('../../models/notes');

// Empty the database
exports['setup'] = function(test) {
    notes.deleteAll(function() {
    test.done();
    });
};

// Create a new Note
exports['create a new note'] = function(test) {
    test.expect(1);
    notes.create('name', 'content', function(success) {
        test.ok(success);
        test.done();
    });
};

// Edit a note
exports['edit a note'] = function(test) {
    test.expect(1);
    notes.edit('noteid', 'content', function(success) {
        test.ok(success);
        test.done();
    });
};

// Delete a note
//exports['delete a note'] = function(test) {
  //  test.expect(1);
    //notes.del('noteid')
//}
// View all notes
exports['view all notes'] = function(test) {
    test.expect(1);
    notes.retrieveAll(function(success) {
        test.ok(success);
        test.done();
    });
};

// Empty the database and close the connection
exports['cleanup'] = function(test) {
    notes.deleteAll(function() {
        notes.close(function() {
            test.done();
        });
    });
};