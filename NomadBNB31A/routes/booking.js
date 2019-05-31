var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var home = require('../models/bookings');

router.get("/bookings/new", function(req, res) {
    if (req.session.user) {
      require('url').parse("/booking/new", true);
      Listing.findById(req.query.id, function(err, listing) {
        req.session.listing = listing;
        req.session.save();
        res.render("bookings/new.handlebars", { listing })
      });
    }
    else {
      res.redirect("/users/login.handlebars");
    }
  });
  
  router.post("/bookings/new", function(req, res) {
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
  
  router.get("/bookings", function(req, res) {
    Booking.find({'requester': req.session.user}, function(err, bookings) {
      Booking.find({}).where('requester').equals(req.session.user).exec(function(err, myBookings) {
        Booking.find({}).where('listingOwner').equals(req.session.user).exec(function(err, receivedBookings) {
            res.render("bookings/index.handlebars", { myBookings, receivedBookings });
        });
      });
    });
  })



module.exports = router;