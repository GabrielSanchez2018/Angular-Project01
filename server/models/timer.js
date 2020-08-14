/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Times executes
==========================*/

const mongoose = require('mongoose');

// role schema
let timeSchema = mongoose.Schema({
    time: {type: Date}
});

// export for public use
module.exports = mongoose.model('Timer', timeSchema);
