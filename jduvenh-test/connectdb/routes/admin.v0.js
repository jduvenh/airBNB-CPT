const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Admin Test route ');
});

router.get('/users/:id', (req, res) => {
    res.send('Admin : The users page user ID is : ' + req.params.id);
});

router.get('/users/', (req, res) => {
    res.send('Admin Welcome to the Users page');
});

router.get('/houses/', (req, res) => {
    res.send('Admin Welcome to the houses page');
});

router.get('/houses/:id', (req, res) => {
    res.send('Admin The house id is : ' + req.params.id);
});

router.get('/home/', (req, res) => {
    res.send('Admin Welcome to the homeHOME page ');
});

router.get('/', (req, res) => {
    res.send('Admin Router');
});

module.exports = router;