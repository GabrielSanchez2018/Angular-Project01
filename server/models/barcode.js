
const mongoose = require('mongoose');


let barcodeSchema = mongoose.Schema({
  username: {type: String},
  barcode: {type: Number },
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
  barTenDigitSerial:{type: Number, unique: true, dropDups: true},
  orderDate: {type: Date}
});



// export for public use
module.exports = mongoose.model('Barcode', barcodeSchema);
