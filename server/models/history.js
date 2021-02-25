/*=========================
Name: Gabriel Sanchez
Date: Dec, 02 2020
Description: History Schema

This api will save history of the purchases
==========================*/

const mongoose = require('mongoose');


let historySchema = mongoose.Schema({
  date: {type: Date},
  history: {type: Array},
  leftoverhistory: {type: Array}


})

module.exports = mongoose.model('History', historySchema)