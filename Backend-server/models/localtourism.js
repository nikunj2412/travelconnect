const mongoose = require('mongoose')
const toJSON = require('./plugins/toJSON.plugin')

const localTourismSchema = new mongoose.Schema({
    placeName : { type: String },
    placeDescription: { type: String },
    location: { type: String },
    placeActivity: { type: String },
    placeImages: {type: Array}, 
    approved: {type: Boolean, default: false}
});

localTourismSchema.plugin(toJSON);

const localTourismModel = mongoose.model('localTourism',localTourismSchema)
  
module.exports = localTourismModel;