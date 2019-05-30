const mongoose = require('mongoose');

const fileHelper = require('../util/file');

//const { validationResult } = require('express-validator/check');

const Roomdb = require('../models/rooms');
const Rooms = require('../models/rooms');

exports.Availrooms = (req, res) => {
    const page = +req.query.page || 1;
    let totalItems;
  
    Rooms.find()
      .countDocuments()
      .then(numProducts => {
        totalItems = numProducts;
        return Rooms.find()
          .skip((page - 1) * 100)
          .limit(100);
      })
      .then(products => {
        res.render('availrooms.ejs', {
          //prods: products,
          rooms: products,
          pageTitle: 'Rooms',
          path: 'availrooms.ejs',
          // currentPage: page,
          // hasNextPage: 100 * page < totalItems,
          // hasPreviousPage: page > 1,
          // nextPage: page + 1,
          // previousPage: page - 1,
          // lastPage: Math.ceil(totalItems / 100)
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  

  };

