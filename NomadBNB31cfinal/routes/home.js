var express = require('express');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//var home = require('../models/home');
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
//router.get('/add-room', isAuth, adminController.getAddProduct);
router.get('/add-room', isAuth, adminController.getAddRoomo);
// /admin/products => GET
//router.get('/products', isAuth, adminController.getRoomsex);
router.get('/roomos', isAuth, adminController.getRoomsex);
//router.get('/viewroom/:roomid', isAuth, adminController.getRoom);


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

  adminController.postEditRoom
);




 module.exports = router;