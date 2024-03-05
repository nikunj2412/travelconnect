const mongoose = require('mongoose')

const travelpostSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    price: {
      type: Number
    },
});

const travelpostModel = mongoose.model('travelpost',travelpostSchema)
  
module.exports = travelpostModel;