/*=========================
Name: Gabriel Sanchez
Date: Dec, 02 2020
Description: History Schema

This api will keep track of the deleted items, for example when a box is entered but the buyer decided to return it.
==========================*/

const mongoose = require('mongoose');


let deletedbarcodesSchema = mongoose.Schema({
  date: {type: Date},
  deletedbarcodes: {type: Array},

})

module.exports = mongoose.model('DeletedBarcodes', deletedbarcodesSchema)