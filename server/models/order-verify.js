/*=========================
Name: Gabriel Sanchez
Date: April 5, 2020
Description: Order Verify
==========================*/
const mongoose = require('mongoose');


let orderverifySchema = mongoose.Schema({
  username: {type: String},
  barcode: {type: String, unique: true, required: true, dropDups: true},
  price: {type: Number},
  barBoxNetWeight:{type: Number},
  totalprice:{type: Number},
  itemdescription:{type: String},
  barProductCode:{type: Number},
  orderDate: {type: Date}
});



// export for public use
module.exports = mongoose.model('Orderverify', orderverifySchema);
