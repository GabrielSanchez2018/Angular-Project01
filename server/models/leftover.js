/*=========================
Name: Gabriel Sanchez
Date: June 31 2020
Assignment: leftover.js
Description: this is the leftover products
==========================*/
const mongoose = require('mongoose');

//Use this extentionn to resolve duplicate issues
var uniqueValidator = require('mongoose-unique-validator')



let leftoverSchema = mongoose.Schema({
  username: {type: String},
  barcode: {type: String, unique: true, required: true, dropDups: true},
  price: {type: Number},
  totalprice:{type: Number},
  itemdescription:{type: String},
  barShippingContainerCode:{type: Number},
  barPackagingIndicator:{type: Number},
  barManufacturerNumber:{type: Number},
  barProductCode:{type: Number},
  barShippingContainerCS:{type: Number},
  barBoxNetWeightIdentifier:{type: Number},
  barBoxNetWeight:{type: Number},
  barDateOfProduction:{type: Number},
  barDateOfProductionyymmdd:{type: Number},
  barSerialNumberIndentifier:{type: Number},
  barTenDigitSerial:{type: Number},
  orderDate: {type: Date}
});


leftoverSchema.plugin(uniqueValidator)

// export for public use
module.exports = mongoose.model('Leftover', leftoverSchema);
