const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Test route in admin');
});

router.get('/users/:id', (req, res) => {
    res.send('The users page user ID is : ' + req.params.id);
});

router.get('/users/', (req, res) => {
    res.send('Welcome to the Users page in admin');
});

router.get('/houses/', (req, res) => {
    res.send('Welcome to the houses page in admin');
});

router.get('/houses/:id', (req, res) => {
    res.send('admin The house id is : ' + req.params.id);
});

router.get('/home/', (req, res) => {
    res.send('admin Welcome to the homeHOME page ');
});

//router.get('/admin', (req, res) => {
 //   app.use(require('../admin'));
//});

// what we export get send back to the page wich required this page
module.exports = router;