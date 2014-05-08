// Registration page: try to register
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
   response.render('reg',{});
};