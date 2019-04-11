const express = require('express');
const { startDb } = require('./db');
const Mongoose = require('mongoose');

const app = express();

//app.use(express.static('../TurtleFacsQuiz)'));
app.set('json spaces', 2);
//node will look for the index,js in this directory and return what that index returns
app.use(require('./routes'));

//the first code to run if the / directory is run
app.get('/', (req, res, next) => {
    console.log('1st rout get handleer');
    next();
});

//the send one will run aswell the next function
app.get('/', (req, res) => {
    console.log('Rendering the Webpage');
    res.send('Backend for AirBNB');
});

//this one wil run if there is no other reqiusts
app.use((req, res) => {
    res.status(404)
        .send('Unknown Requist');
})

//on wich port to listen for the rout
//only spin up the app if we can comunicate with the db
startDb()
        Mongoose.connection.once('open', () => {
        app.listen(3000, () => {
            console.log('App is listening on port 3000');
        });
});
