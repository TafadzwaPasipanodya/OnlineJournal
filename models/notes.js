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
module.exports.edit = function(noteid, content, callback) {
    
    db.notes.findOne({_id:mongojs.ObjectId(noteid)}, function(error, note) {
        if (error) throw error;
        
        note.content = content;
        db.notes.save(note, function(error) {
            if (error) throw error;
            callback(note);
        });
    });
};

// Delete a note
module.exports.del = function(noteid) {

    db.notes.findOne({_id:mongojs.ObjectId(noteid)}, function(error, note) {
        if (error) throw error;
        
        db.notes.remove(note, function(error) {
            if (error) throw error;
        
        });
    });
}

// View all notes from database
module.exports.retrieveAll = function(callback) {
    db.notes.find({}, function(error, allNotes) {
        if (error) throw error;
        callback(allNotes);
    });
};

// View one note from database
module.exports.retrieveOne = function(noteid, callback) {
    console.log(noteid);
    db.notes.findOne({_id:mongojs.ObjectId(noteid)}, function(error, note) {
        if (error) throw error;
        console.log(note);
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
