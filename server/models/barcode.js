
const mongoose = require('mongoose');

let barcodeSchema = mongoose.Schema({
  username: {type: String, unique: true},
  barcode: {type: Number, unique: true, dropDups: true },
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
});



// export for public use
module.exports = mongoose.model('Barcode', barcodeSchema);
