var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  available: { type: Date, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }
});

var Listing = module.exports = mongoose.model('Listing', listingSchema);
