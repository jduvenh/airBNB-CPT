const mongoose = require('mongoose');

function startDb() {
  mongoose.connect('mongodb+srv://Nomad:dbNomad.0@cluster0-y2gv8.azure.mongodb.net/test?retryWrites=true/turtlequiz', {
    useNewUrlParser: true,
    keepAlive: 1
  })
  .then(() => console.log('Mongodb successully connected'));

  return mongoose.connection
    .on('error', console.error)
    .on('disconnected', startDb);
}

module.exports = {
  startDb,
}