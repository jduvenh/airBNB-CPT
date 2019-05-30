var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
var User = require('../models/user');
const crypto = require('crypto');

const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  );
//register
router.get('/register', function(req, res) {
    res.render('register.handlebars');
});

//login
router.get('/login', function(req, res) {
    res.render('login.handlebars');
});

//Register User
router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var tenant = req.body.tenant;
    var landlord = req.body.chooseArea;
    var isLord = false;
    console.log(landlord);
    var seed = crypto.randomBytes(20);
    const Token = crypto.createHash('sha1').update(seed + email).digest('hex');
    
    //Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('tenant', 'Are you a Tenant or a Landlord');


    
    var errors = req.validationErrors();
    if(landlord === "Landlord"){
              isLord = true; 
            }
    if(errors){
        res.render('register.handlebars', {
            errors:errors
        });
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            isLord: isLord,
            verifyToken: Token  
        });
        
        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });
        
        //req.flash('success_msg', 'You are now registered and can log in');
        req.flash('success_msg', 'You are now registered and can log in');
        var link = "http://"+req.get('host')+"/users/verify?id="+Token;
        res.redirect('/users/login');
        return transporter.sendMail({
          to: email,
          from: 'NOMAD@nomadbnb.com',
          subject: 'Verify Nomad Account!',
          html: `<h1>Hi ${name} please verify your account!</h1>
          </br> Hello,<br> Please Click on the link to verify your email.<br><a href=${link}><H1>Click here to verify</H1></a>`
        // return transporter.sendMail({
        //     to: email,
        //     from: 'nomad@nomadbnb.com',
        //     subject: 'Signup succeeded!',
        //     html: '<h1>You successfully signed up!</h1>'
          });
        //});
        
    }
});

router.get('/verify', function(req, res)  {
  var tURL = req.query.id;
  console.log(tURL);

  // Find the user that matches the verifyToken
  User.findOne({ verifyToken: tURL })
  .then(User => {
      if(!User) {
          req.flash('error', 'Email is already verified or Does not exist');
          var link = "http://"+req.get('host')+"/";
          res.send(`<H1>Email is already verified</H1><a href=${link}><H1>Click here to go back</H1></a>`);
          //req.flash('error', 'Email is already verified');
          //res.redirect('/users/register');
          return;
      }
      User.isVerified = true;
      User.verifyToken = ''; // Setting verifyToken to nothing once validation

      User.save(); 
      req.flash('success_msg', 'Thank you for verifying. You may now login');
      res.redirect('/users/login');
  })
  .catch(err => console.log(err));
});

passport.use(new LocalStrategy(
  function(username, password, done) {
      User.getUserByUsername(username, function(err, user){
          if(err) throw err;
          if(!User){
              return done(null, false, {message: 'Unknown User'});
          }
          
          User.comparePassword(password, user.password,function(err, isMatch){
              if(err) throw err;
              if(isMatch){
                console.log("isMatch true 133 ");
                  return done(null, user);
              } else {
                //send('Invalid Password or Account not verified check email for link');
                  return done(null, false, {message: 'Invalid Password or Account not verified check email for link'});
              }
          });
      });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  //passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:true}),
  function(req, res, next) {
   console.log(req.body.username);
   var usern = req.body.username;
   User.findOne({username: usern , isVerified : true})
    .then(User => {
      if(User){
      console.log(true);
      
     // passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:true});
    //res.redirect('/');
    next();
    
      }
    
    if(!User){
    
      console.log('not verified');
      var link = "http://"+req.get('host')+"/";
          res.send(`<H1>Email is not verified or fields missing<br>
          please verify email<br>
          check your email ${usern}</H1>
          <br><a href=${link}><H1>Click here to go back</H1></a>`);
  }})
  },
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:true})
);

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;