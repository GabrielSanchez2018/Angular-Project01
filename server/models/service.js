/*=========================
Name: Brittany Dockter
Date: March 31, 2020
Assignment: rele create
Description: create new services
question schema for user security
==========================*/

const mongoose = require('mongoose');

// This will be the model to create new services.
let serviceSchema = mongoose.Schema({
    title: {type: String},
    price: {type: Number},
    id: {type:Number},
    isDisabled: {type: Boolean, default: false}
});

// export for public use
module.exports = mongoose.model('Services', serviceSchema);
