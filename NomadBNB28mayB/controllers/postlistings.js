// const mongoose = require('mongoose');

// const fileHelper = require('../util/file');

// //const { validationResult } = require('express-validator/check');

// const Roomdb = require('../models/rooms');

// exports.Postlistings = (req, res) => {
//     var name = req.body.name;
//     var description = req.body.description;
//     var price = req.body.price;
//     var available = req.body.available;
//     var booking = null;
//     var owner = req.session.user;
//     var image = req.file;
//     console.log(image);
//     console.log(name);
//     console.log(price);
//     console.log(description);
//     console.log(available);
//     /////////////////
//       if (!image) {
//         console.log('Attached file is not an image.');
//         res.redirect('listings/new');
//       }
      
    
//       const imageUrl = image.path;
//       console.log('line65 admin.js');
    
//       const roomdb = new Roomdb({
//         // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
//         title: name,
//         price: price,
//         description: description,
//         available: available,
//         imageUrl: imageUrl,
//         owner: null,
//         //image: image,
//         userId: req.session.user
//       });
//       roomdb
//         .save()
//         .then(result => {
//           // console.log(result);
//           console.log('Created Room');
//           //res.redirect('/home/availrooms');
//           res.redirect('/');
//         })
//         .catch(err => {
//           const error = new Error(err);
//           error.httpStatusCode = 500;
//           return next(error);
//         })
//     //});
//     ////////////////////
//   res.redirect("/home/availrooms");
//     };
const mongoose = require('mongoose');

const fileHelper = require('../util/file');

//const { validationResult } = require('express-validator/check');

const Roomdb = require('../models/rooms');

exports.Postlistings = (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    var available = req.body.available;
    var landemail = req.body.landemail;
    var landtell = req.body.landtell;
    var booking = null;
    var owner = req.session.user;
    var image = req.file;
    var roomlong = req.body.geolocateLat;
    var roomlat = req.body.geolocateLong;
    console.log(req.body.geolocateLong);
    console.log(image);
    console.log(name);
    console.log(price);
    console.log(description);
    console.log(available);
    console.log(roomlong);
    console.log(roomlat);
    console.log(landemail);
    console.log(landtell);
    /////////////////
      if (!image) {
        console.log('Attached file is not an image.');
        res.redirect('listings/new');
      }
      
    
      const imageUrl = image.path;
      console.log('line65 admin.js');
    
      const roomdb = new Roomdb({
        // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
        title: name,
        price: price,
        description: description,
        available: available,
        imageUrl: imageUrl,
        owner: null,
        //image: image,
        userId: req.session.user,
        georoom: { coordinates: [parseFloat(roomlong), parseFloat(roomlat)]},
        booked: false,
        bookedby: "",
        roomemail: landemail,
        roomnumber: landtell
      });
      roomdb
        .save()
        .then(result => {
          // console.log(result);
          console.log('Created Room');
          //res.redirect('/home/availrooms');
          res.redirect('/');
        })
        .catch(err => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        })
    //});
    ////////////////////
  res.redirect("/home/availrooms");
    };



