/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Barcode Schema
==========================*/


const mongoose = require('mongoose');

//This will make sure that require functions works
//Use this extentionn to resolve duplicate issues
//barTenDigitSerial:{type: Number, unique: true, required: true, dropDups: true},
var uniqueValidator = require('mongoose-unique-validator')


let barcodeSchema = mongoose.Schema({
  
  username: {type: String},
  barcode: {type: String, unique: true, required: true, dropDups: true},
  price: {type: Number},
  barBoxNetWeight:{type: Number},
  totalprice:{type: Number},
  itemdescription:{type: String},
  //barShippingContainerCode:{type: Number},
  //barPackagingIndicator:{type: Number},
  //barManufacturerNumber:{type: Number},
  barProductCode:{type: Number},
  //barShippingContainerCS:{type: Number},
  //barBoxNetWeightIdentifier:{type: Number},
  //barDateOfProduction:{type: Number},
  //barDateOfProductionyymmdd:{type: Number},
  //barSerialNumberIndentifier:{type: Number},
  orderDate: {type: Date}
});


barcodeSchema.plugin(uniqueValidator)
// export for public use
module.exports = mongoose.model('Barcode', barcodeSchema);
