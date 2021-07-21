const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campaign = new Schema({
 campaignName: {
     type: String,
     required: true
 },
 keywords: [{
    type: String,
    required: true
}],
 bidAmount: {
     type: Number,
     required: true,
     trim: true
 },
campaignFund: {
    type: Number,
    required: true,
    trim: true
},
status: {
    type: String,
    required: true,
    trim: true
},
town: {
    type: String,
    trim: true
},
radius: {
    type: String,
    required: true,
    trim: true
}
})


const campaigns = mongoose.model('Campaigns', campaign)

campaigns.createCollection().then(function() {
    console.log('Collection is created!');
  });
module.exports = campaigns;
