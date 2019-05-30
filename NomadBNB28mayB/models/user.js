var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    isLord: {
        type: Boolean
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String,
        default: ""
    }

});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.islandlord = function(username, callback){
    var query = {username: username , isLord : true};
    User.findOne(query, callback);
}

module.exports.isVerified = function(username, callback){
    var query = {username: username , isVerified: true};
    User.findOne(query, callback);
}

module.exports.getUserById = function(Id, callback){
    User.findById(Id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        console.log("callback ismatch");
        callback(null, isMatch);  
    });
}