var express = require('express');
var bcryot = require('bcryptjs');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/NomadBNBv2');
mongoose.connect('mongodb+srv://Nomad0:Nomad0@cluster0-y2gv8.azure.mongodb.net/test?retryWrites=true');
var listing = require('./models/listing');
var user = require('./models/user');
var Listing = mongoose.model('Listing');
var listing = require('./models/listing');
var booking = require('./models/bookings');
var Booking = mongoose.model('Booking');
var db = mongoose.connection;
const csrf = require('csurf');
const multer = require('multer');

var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var booking = require('./routes/booking');
//var editroom = require('./routes/posteditroom');
//const router = require('./routes/uploadimagerouter');
const formidable = require('formidable');


//Init app
var app = express();
const Roomdb = require('./models/rooms');
const Rooms = require('./models/rooms');
const postlistingsController = require('./controllers/postlistings');
const avvailrooomsController = require('./controllers/availrooms');
const bookingController = require('./controllers/booking');
const listingsController = require('./controllers/listings');

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'ejs');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "css"));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );
//app.use(csrfProtection);
app.use(flash());


//body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser());
//app.use('/upload', router);

//Set static folder 
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public/images')));

//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport Init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
        
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param: formParam,
            msg  : msg,
            value : value
        }
    }
}));

//Connect flash
app.use(flash());

//Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/home', home);
app.use('/bookings', booking);
app.use('/add-room', home);


app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  //res.locals.csrfToken = req.csrfToken();
  next();
});

app.get("/bookings/new", function(req, res) {
    if (req.session.user) {
      require('url').parse("/booking/new", true);
      Listing.findById(req.query.id, function(err, listing) {
        req.session.listing = listing;
        req.session.save();
        res.render("bookings/new.handlebars", { listing })
      });
    }
    else {
      res.redirect("/users/login");
    }
  });
  
  app.post("/bookings/new", function(req, res) {
    Listing.findById(req.session.listing, function(err, currentListing) {
      Booking.create({bookingDate: currentListing.available,
                      confirmed: false,
                      rejected: false,
                      totalPrice: currentListing.price,
                      listing: currentListing,
                      listingName: currentListing.name,
                      listingOwner: currentListing.owner,
                      requester: req.session.user,
                      requesterName: req.session.user.name
                      }),
        function (err, booking) {
          if (err) {
            res.send("There was a problem adding the information to the database.");
          } else {
            console.log('New booking has been created');
          }
        };
        res.redirect("/bookings");
    });
  });
  ///////////////////////////////
  app.get("/bookings", bookingController.getBookings );
//////////////////////////////////////
  app.get('/bookings/complete', bookingController.getBookingsComplete );
////////////////////////////////////////////
  app.get("/listings/new", function (req, res) {
    if (req.session.user) {
      res.render("listings/new.handlebars", {});
    }
    else {
      res.render("listings/new.handlebars", {});
      // res.redirect("/users/login");
    }
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  app.post("/listings", postlistingsController.Postlistings);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  app.get('/home/availrooms', avvailrooomsController.Availrooms );
 /////////////////////////////////////////////////////////////////////////////
 app.post('/home/postavailrooms', avvailrooomsController.postBookAvailrooms );
 /////////////////////////////////////////////////////////////////////////////
 app.post('/home/availrooms', avvailrooomsController.postAvailrooms );
 /////////////////////////////////////////////////////////////////////////////
  app.get("/listings", listingsController.getListings);
////////////////////////////////////////////////////////////////////
  app.get('/listings_filter', function(req, res){
    req.session.filter_date = req.query.filter_date;
    Listing.find({}).where('available').equals(req.session.filter_date).where('booking').equals(null).exec(function(err, listings) {
      res.render("listings/index.handlebars", { listings });
    });
  });


//set port

app.set('port', (process.env.PORT || 4003));
//
app.listen(app.get('port'), function() {
   console.log('server started on port ' + app.get('port')); 
});