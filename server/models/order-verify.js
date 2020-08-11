/*=========================
Name: Gabriel Sanchez
Date: April 5, 2020
Description: Order Verify
==========================*/
const mongoose = require('mongoose');


let orderverifySchema = mongoose.Schema({
  username: {type: String},
  barcode: {type: String },
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



// export for public use
module.exports = mongoose.model('Orderverify', orderverifySchema);
