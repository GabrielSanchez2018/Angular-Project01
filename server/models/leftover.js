/*=========================
Name: Gabriel Sanchez
Date: June 31 2020
Description: this is the leftover products
==========================*/
const mongoose = require('mongoose');

//Use this extentionn to resolve duplicate issues
var uniqueValidator = require('mongoose-unique-validator')



let leftoverSchema = mongoose.Schema({
  
  username: {type: String},
  barcode: {type: String, unique: true, required: true, dropDups: true},
  price: {type: Number},
  barBoxNetWeight:{type: Number},
  totalprice:{type: Number},
  itemdescription:{type: String},
  barProductCode:{type: Number},
  orderDate: {type: Date}
});


leftoverSchema.plugin(uniqueValidator)

// export for public use
module.exports = mongoose.model('Leftover', leftoverSchema);
