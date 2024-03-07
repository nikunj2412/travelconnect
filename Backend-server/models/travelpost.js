const mongoose = require('mongoose')

const travelpostSchema = new mongoose.Schema({
    packageName: { type: String },
    packageDescription: { type: String },
    packagePrice: { type: Number },
    location: { type: String },
    packageDays: { type: Number },
    packageNights: { type: Number },
    packageActivity: { type: String },
    inclusion: { type: String },
    exclusion: { type: String },
    packageImages: {type: Array}
});

const travelpostModel = mongoose.model('travelpost',travelpostSchema)
  
module.exports = travelpostModel;