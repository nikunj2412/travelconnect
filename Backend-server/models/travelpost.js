const mongoose = require('mongoose')

const travelpostSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    image: {type: String},
    price: {
      type: Number
    },
    duration: {
        type: String
    },
    location: {
        type: String
    },
    includedServices: {
        type: String
    },
    excludedServices: {
        type: String
    },
    aminities: {
        type: String
    }
});

const travelpostModel = mongoose.model('travelpost',travelpostSchema)
  
module.exports = travelpostModel;