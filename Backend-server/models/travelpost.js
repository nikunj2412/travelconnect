const mongoose = require('mongoose')
const toJSON = require('./plugins/toJSON.plugin')

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
    packageRating: {type: Number, default: 0},
    averageRating: {type: Number, default: 0},
    packageImages: {type: Array}
});

travelpostSchema.plugin(toJSON);

const travelpostModel = mongoose.model('travelpost',travelpostSchema)
  
module.exports = travelpostModel;