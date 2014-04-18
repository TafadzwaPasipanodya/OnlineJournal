// A model for a note collection
var mongojs = require('mongojs');

// Create Note database
var db = mongojs('noteapp', ['notes']);

// Create a new note
module.exports.create = function(name, itemid, callback) {
    db.notes.insert({name:name, parent:itemid}, function(error) {
        if (error) throw error;
        
        callback();
    });
};

// Edit an existing note
module.exports.edit = function(name, callback) {
    // Receive the content from the textbox
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
module.exports.view = function(name, callback) {
    db.notes.find({}, function(error, note) {
        if (error) throw error;
        
        var table = '<table>';
        table += '<tr><th>Notes</th></tr>';
        note.forEach(function(notes) {
            table += '<tr><th>' + notes.name + '</th></tr>';
        });
    
    table += '</table>';
    
    
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