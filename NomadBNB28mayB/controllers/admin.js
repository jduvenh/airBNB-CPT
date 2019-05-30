const mongoose = require('mongoose');

const fileHelper = require('../util/file');

const { validationResult } = require('express-validator/check');

const Roomdb = require('../models/rooms');
var express = require('express');
//const router = require('../routes/uploadimagerouter');
var router = express.Router();
const isAuth = require('../middleware/is-auth');
const adminController = require('../controllers/admin');

exports.getAddProduct = (req, res, next) => {
  res.render('edit-room.ejs', {
    pageTitle: 'Add Room',
    isAuthenticated: true,
    path: '/home/edit-room',
    editing: false,
    hasError: false,
    errorMessage: null,
    isAuthenticated: true,
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  //const image = req.body.image;
  //var image = req.file;
  var image = req.file;
  const price = req.body.price;
  console.log(title);
  const description = req.body.description;
  console.log('line27');
  if (!image) {
    console.log('Attached file is not an image.');
    return res.status(422).render('edit-room.ejs', {
      pageTitle: 'Add Room',
      isAuthenticated: true,
      path: '/add-room',
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description
      },
 
    });
  }
  //const errors = validationResult(req);
  //if (!errors.isEmpty()) {
  if (false) {
    console.log(errors.array());
    return res.status(422).render('edit-room.ejs', {
      pageTitle: 'Add Room',
      isAuthenticated: true,
      path: '/admin/add-rooom',
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imageUrl = image.path;
  console.log('line65 admin.js');

  const roomdb = new Roomdb({
    // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    //image: image,
    userId: req.session.user
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
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // Product.findById(prodId)
  //   .then(product => {
  //     if (!product) {
  //       return res.redirect('/');
  //     }
  //     res.render('edit-room.ejs', {
  //       pageTitle: 'Edit Room',
  //       isAuthenticated: true,
  //       path: '/home/edit-room',
  //       editing: editMode,
  //       product: product,
  //       hasError: false,
  //       errorMessage: null,
  //       validationErrors: [],
       
  //     });
  //   })
  //   .catch(err => {
  //     const error = new Error(err);
  //     error.httpStatusCode = 500;
  //     return next(error);
  //   });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('edit-room.ejs', {
      pageTitle: 'Edit Room',
      isAuthenticated: true,
      path: '/home/edit-room',
      editing: true,
      hasError: true,
      room: {
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDesc,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  // Product.findById(prodId)
  //   .then(product => {
  //    // if (product.userId.toString() !== req.user._id.toString()) {
  //    //  return res.redirect('/');
  //     //}
  //     product.title = updatedTitle;
  //     product.price = updatedPrice;
  //     product.description = updatedDesc;
  //     if (image) {
  //       fileHelper.deleteFile(product.imageUrl);
  //       product.imageUrl = image.path;
  //     }
  //     return product.save().then(result => {
  //       console.log('UPDATED PRODUCT!');
  //       res.redirect('/home/availrooms');
  //     });
  //   })
  //   .catch(err => {
  //     const error = new Error(err);
  //     error.httpStatusCode = 500;
  //     return next(error);
  //   });

};

exports.getProducts = (req, res) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('home/availrooms', {
        prods: products,
        _id : 5,
        pageTitle: 'Rooms',
        path: '/home/availrooms'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};




exports.deleteProduct = (req, res, next) => {
  // const prodId = req.params.productId;
  // Product.findById(prodId)
  //   .then(product => {
  //     if (!product) {
  //       return next(new Error('Product not found.'));
  //     }
  //     fileHelper.deleteFile(product.imageUrl);
  //     return Product.deleteOne({ _id: prodId, userId: req.user._id });
  //   })
  //   .then(() => {
  //     console.log('DESTROYED PRODUCT');
  //     res.status(200).json({ message: 'Success!' });
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: 'Deleting product failed.' });
  //    });
};
