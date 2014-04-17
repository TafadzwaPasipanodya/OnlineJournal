// A model for a note collection
var mongojs = require('mongojs');

// Create Note database
var db = mongojs('noteapp', ['notes']);

// Create a new note
module.exports.create = function(name, callback) {
    db.notes.findOne({name:name}, function(error, note){
        if (error) throw error;
        
        if (!note) {
            note = {name:name, content:""};
        }
        
        db.notes.save(note, function(error){
            if (error) throw error;
        });
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