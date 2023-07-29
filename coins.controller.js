const Coins = require('./coins.model');

exports.getCoins = (req, res) => {
  Coins.findOne({})
  .then((coins) => {
      if (!coins) {
          return res.status(404).json({ message: 'Coins not found' });
        }
    //   console.log('Coins retreived succesfully');
      return res.status(200).json(coins);
    })
    .catch((err) => {
      return res.status(500).json({ error: 'Error retrieving coins' });
    });
};

exports.updateCoins = (req, res) => {
//   console.log('Coins update req');
  
  Coins.findOneAndUpdate({}, { coins: req.body.coins }, { new: true, upsert: true })
    .then((updatedCoins) => {
    //   console.log('Coins updated successfully');
      return res.status(200).json(updatedCoins);
    })
    .catch((err) => {
      return res.status(500).json({ error: 'Error updating coins' });
    });
};
