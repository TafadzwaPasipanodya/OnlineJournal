// A model for a note collection
var mongojs = require('mongojs');

// Create Note database
var db = mongojs('noteapp', ['notes']);

// Create a new note
module.exports.create = function(name, content, callback) {
    db.notes.insert({name:name, content:content}, function(error) {
        if (error) throw error;
        callback();
    });
};

// Edit an existing note
module.exports.edit = function(name, callback) {
    // Receive the content from the textarea
    var content = request.body.content;
    
    db.notes.findOne({name:name}, function(error, note) {
        if (error) throw error;
        
        if (note) {
            note.content = content;
        }
        
        db.notes.save(note, function(error) {
            if (error) throw error;
        });
    });
};

// View notes for a specific user
module.exports.retrieveAll = function(callback) {
    db.notes.find({}, function(error, notes) {
        if (error) throw error;
        
        callback(notes);
    });
};

// Delete a note
module.exports.delete = function(name, callback) {
    db.notes.findOne({name:name}, function(error, note) {
        if (error) throw error;
        
        if (note) {
            db.notes.remove({name:name})
        }

        callback(note);
    });
};

// Save a note
module.exports.save = function(name, callback) {
    var content = request.body.content;
    
    db.notes.findOne({name:name}, function(error, newnote) {
        if (error) throw error;

        if (newnote) {
            newnote.content = content;
        }
        db.notes.save(newnote, function(error) {
            if (error) throw error;
        });
    });
}

// Retrieve all notes from database
module.exports.retrieveAll = function(callback) {
    db.notes.find({}, function(error, allNotes) {
        if (error) throw error;
        callback(allNotes);
    });
};

// Retrieve one note from database
module.exports.retrieveOne = function(itemid, callback) {
    db.notes.findOne({_id:itemid}, function(error, note) {
        if (error) throw error;
        callback(note);
    });
};

// Delete all notes in database
module.exports.deleteAll = function(callback) {
    db.notes.remove({}, function(error) {
        if (error)  throw error;
        callback();
    });
};

// Close connection to database
module.exports.close = function(callback) {
    db.close(function(error) {
        if (error) throw error;
        callback();
    });
};