const mongoose = require('mongoose');

const fileHelper = require('../util/file');

//const { validationResult } = require('express-validator/check');

const Roomdb = require('../models/rooms');

exports.getListings = function(req, res) {
    if (req.session.filter_date) {
      Listing.find({}).where('available').equals(req.session.filter_date).where('booking').equals(null).exec(function(err, listings) {
        res.render("listings/index.handlebars", { listings });
      });
    } else {
      res.render("listings/index.handlebars", { listings: null });
    }
  };

