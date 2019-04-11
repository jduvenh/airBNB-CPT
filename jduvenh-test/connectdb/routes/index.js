const express = require('express');
const router = express.Router();

router.use('/api', require('./api.v0.js'));
router.use('/admin', require('./admin.v0.js'));

router.get('/test', (req, res) => {
    res.send('Test route');
});

router.get('/users/:id', (req, res) => {
    res.send('The users page user ID is : ' + req.params.id);
});

router.get('/users/', (req, res) => {
    res.send('Welcome to the Users page ');
});

router.get('/houses/', (req, res) => {
    res.send('Welcome to the houses page ');
});

router.get('/houses/:id', (req, res) => {
    res.send('The house id is : ' + req.params.id);
});

router.get('/home/', (req, res) => {
    res.send('Welcome to the homeHOME page ');
});



// what we export get send back to the page wich required this page
module.exports = router;