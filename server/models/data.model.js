const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  block_number: {
    type: Number,
    required: true
  },
  transaction_id: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  block_confirmations: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  transaction_fee: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Data', DataSchema);