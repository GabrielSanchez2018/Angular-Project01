/*=========================
Name: Gabriel Sanchez
Date: August, 2020
Description: create new services
question schema for user security
==========================*/

const mongoose = require('mongoose');

// This will be the model to create new services.
let serviceSchema = mongoose.Schema({
    title: {type: String},
    price: {type: Number},
    extimate: {type: Number},
    id: {type: Number },
    inStockProd: {type: Number, default: 0},
    isDisabled: {type: Boolean, default: false}
});

// export for public use
module.exports = mongoose.model('Services', serviceSchema);
