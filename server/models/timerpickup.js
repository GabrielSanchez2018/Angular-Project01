/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: This timer will set up the day to pick up.
==========================*/

const mongoose = require('mongoose');

// role schema
let timepickupSchema = mongoose.Schema({

    time: {type: String},
    time1: {type: String},
    orderDate: {type: Date}
});

// export for public use
module.exports = mongoose.model('Timepickup', timepickupSchema);
