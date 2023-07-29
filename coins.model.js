const mongoose = require('mongoose');

const coinsSchema = new mongoose.Schema({
  coins: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Coins', coinsSchema);
