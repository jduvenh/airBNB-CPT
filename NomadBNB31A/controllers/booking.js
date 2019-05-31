const mongoose = require('mongoose');

const fileHelper = require('../util/file');

//const { validationResult } = require('express-validator/check');

const Roomdb = require('../models/rooms');

exports.getBookings = function(req, res) {
    Booking.find({'requester': req.session.user}, function(err, bookings) {
      Booking.find({}).where('requester').equals(req.session.user).exec(function(err, myBookings) {
        Booking.find({}).where('listingOwner').equals(req.session.user).exec(function(err, receivedBookings) {
            res.render("bookings/index.handlebars", { myBookings, receivedBookings });
        });
      });
    });
  };

exports.getBookingsComplete = function(req, res) {
    if (req.query.action === "confirm") {
      Booking.findById(req.query.booking_id, function(err, currentBooking) {
        Booking.findOneAndUpdate({ _id: currentBooking._id }, {$set: { confirmed: true } }, {new: true}, function(err, booking) {});
        Booking.find({}).where('listing').equals(currentBooking.listing).where('confirmed').equals(false).where('rejected').equals(false).exec(function(err, bookings) {
          bookings.forEach(function(booking) {
            Booking.findOneAndUpdate({ _id: booking._id }, {$set: { rejected: true } }, {new: true}, function(err, booking) {
            });
          });
          res.redirect('/bookings');
          Listing.findOneAndUpdate({ _id: currentBooking.listing }, {$set: { booking: currentBooking } }, {new: true}, function(err, listing) {});
        });
      })
    }
    else if (req.query.action === "reject") {
      Booking.findOneAndUpdate({ _id: req.query.booking_id }, {$set: { rejected: true } }, {new: true}, function(err, booking) {} );
      res.redirect('/bookings');
    }
  };