const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  var bool = true;
  if(products.length){bool = true} else {bool = false};
  res.render('shop', {prods: products, pageTitle: 'Shop', path : '/', hasProducts: bool});
  console.log(products);
  console.log(bool);
});

module.exports = router;
 