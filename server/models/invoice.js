/*=========================
Name: Brittany Dockter
Date: April 20, 2020
Assignment: invoice.js
Description: create an invoiceSchema for orders
==========================*/
const mongoose = require('mongoose');

// line item schema
let lineItemSchema = mongoose.Schema({
  title: {type: String},
  price: {type: Number},
  id: {type: Number}
});
// Barcode
// let barcodeSchema = mongoose.Schema({
//       barcode: {type: Number, unique: true, dropDups: true },
//       barShippingContainerCode:{type: Number},
//       barPackagingIndicator:{type: Number},
//       barManufacturerNumber:{type: Number},
//       barProductCode:{type: Number},
//       barShippingContainerCS:{type: Number},
//       barBoxNetWeightIdentifier:{type: Number},
//       barBoxNetWeight:{type: Number},
//       barDateOfProduction:{type: Number},
//       barDateOfProductionyymmdd:{type: Number},
//       barSerialNumberIndentifier:{type: Number},
//       barTenDigitSerial:{type: Number, unique: true, dropDups: true},
// });

// invoice schema
let invoiceSchema = mongoose.Schema({
    lineItems: [lineItemSchema],
   // barcode:[barcodeSchema],
    partsAmount: {type: Number},
    laborAmount: {type: Number},
    lineItemTotal: {type: Number},
    total: {type: Number},
    username: {type: String},
    orderDate: {type: Date}
});

// export for public use
module.exports = mongoose.model('Invoice', invoiceSchema);
