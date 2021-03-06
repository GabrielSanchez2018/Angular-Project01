/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: This timer will set up the last day to order
==========================*/

const mongoose = require('mongoose');

// role schema
let timeSchema = mongoose.Schema({

    time: {type: String},
    time1: {type: String},
    orderDate: {type: Date}
});

// export for public use
module.exports = mongoose.model('Timer', timeSchema);
