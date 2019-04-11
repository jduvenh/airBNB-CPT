const { turtlesData } = require('../data');
const mongoose = require('mongoose');

const FactSchema = new mongoose.Schema({
  fact_type: String,
  fact_image_url: String,
  fact_data: Object,
  fact_description: String,
  update_at: { type: Date, default: Date.now }
});

const Fact = mongoose.model('Fact', FactSchema);

module.exports = {
  Fact,
  getTurtleData,
}

//function getTurtleData() {
//  return Fact.find();
//}

function getTurtleData() {
    return Promise.resolve(turtlesData);
}