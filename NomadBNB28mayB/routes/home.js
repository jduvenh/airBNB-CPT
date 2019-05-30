var express = require('express');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var home = require('../models/home');
const path = require('path');

const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
//const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
//const upload = require('../middleware/uploadMiddleware');
//const Resize = require('../Resize');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
//const formidable = require('formidable')


router.get('/home', function(req, res) {
    res.render('home.handlebars');
}); 

//router.get('/availrooms', adminController.getProducts);

// /admin/add-product => GET
router.get('/add-room', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);
//router.get('/viewroom/:roomid', isAuth, adminController.getRoom);

router.post(
  '/add-room',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);
router.post(
  '/edit-room',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);


 module.exports = router;