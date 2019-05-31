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
        
          rooms: products,
          pageTitle: 'Rooms',
          path: 'availrooms.ejs',
  
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };

  exports.postAvailrooms = (req, res) => {
    const roomid = req.body.roomid;
    const page = +req.query.page || 1;
    let totalItems;
    console.log(roomid);
    
    Rooms.findOne({_id : roomid})
    .countDocuments()
      .then(numProducts => {
        totalItems = numProducts;
        return Rooms.find({_id : roomid})
          .skip((page - 1) * 100)
          .limit(100);
      })
      .then(products => {
        res.render('availroomsview.ejs', {
        
          rooms: products,
          pageTitle: 'Rooms',
          path: 'availrooms.ejs',
  
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });

    // Rooms.find()
    //   .countDocuments()
    //   .then(numProducts => {
    //     totalItems = numProducts;
    //     return Rooms.find()
    //       .skip((page - 1) * 100)
    //       .limit(100);
    //   })
    //   .then(products => {
    //     res.render('availrooms.ejs', {
        
    //       rooms: products,
    //       pageTitle: 'Rooms',
    //       path: 'availrooms.ejs',
  
    //     });
    //   })
    //   .catch(err => {
    //     const error = new Error(err);
    //     error.httpStatusCode = 500;
    //     return next(error);
    //   });
  };

  exports.postBookAvailrooms = (req, res) => {
    const roomid = req.body.roomid;
    const page = +req.query.page || 1;
    let totalItems;
    console.log(roomid);
    
    Rooms.findOne({ _id: roomid })
  .then(Rooms => {
      // if(!User) {
      //     req.flash('error', 'Email is already verified or Does not exist');
      //     var link = "http://"+req.get('host')+"/";
      //     res.send(`<H1>Email is already verified</H1><a href=${link}><H1>Click here to go back</H1></a>`);
      //     //req.flash('error', 'Email is already verified');
      //     //res.redirect('/users/register');
      //     return;
      // }
      Rooms.booked = true;
      ///User.verifyToken = ''; // Setting verifyToken to nothing once validation

      Rooms.save(); 
      req.flash('success_msg', 'room booked');
      console.log("room booked ");
      res.redirect('/home/availrooms');
  })
  .catch(err => console.log(err));
// });


//     .countDocuments()
//       .then(numProducts => {
//         totalItems = numProducts;
//         return Rooms.find({_id : roomid})
//           .skip((page - 1) * 100)
//           .limit(100);
//       })
//       .then(products => {
//         res.render('availroomsview.ejs', {
        
//           rooms: products,
//           pageTitle: 'Rooms',
//           path: 'availroomsview.ejs',
  
//         });
//       })
//       .catch(err => {
//         const error = new Error(err);
//         error.httpStatusCode = 500;
//         return next(error);
//       });

    // Rooms.find()
    //   .countDocuments()
    //   .then(numProducts => {
    //     totalItems = numProducts;
    //     return Rooms.find()
    //       .skip((page - 1) * 100)
    //       .limit(100);
    //   })
    //   .then(products => {
    //     res.render('availrooms.ejs', {
        
    //       rooms: products,
    //       pageTitle: 'Rooms',
    //       path: 'availrooms.ejs',
  
    //     });
    //   })
    //   .catch(err => {
    //     const error = new Error(err);
    //     error.httpStatusCode = 500;
    //     return next(error);
    //   });
  };
