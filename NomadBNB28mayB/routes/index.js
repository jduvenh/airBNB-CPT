var express = require('express');
var router = express.Router();
//var islord =
var User = require('../models/user'); 
//var isLord =  User.islandlord(user.email);
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('index.handlebars');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
       return next();
    } else {
        //Take this line out if you dont want the error to show up
//        req.flash('error_msg','You are not logged in');
        
        
        res.redirect('/home/home');
    }
}

module.exports = router;